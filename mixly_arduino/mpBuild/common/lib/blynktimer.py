# Copyright (c) 2019 Anton Morozenko
"""
Polling timers for functions.
Registers timers and performs run once or periodical function execution after defined time intervals.
"""
try:
    import utime as time
    import uselect as select
except ImportError:
    import time
    import select

WAIT_SEC = 0.05
MAX_TIMERS = 16
DEFAULT_INTERVAL = 10


class TimerError(Exception):
    pass


class Timer(object):
    timers = {}

    def __init__(self, no_timers_err=True):
        self.no_timers_err = no_timers_err

    def _get_func_name(self, obj):
        if getattr(obj, '__name__', None) is None:
            return self._get_func_name(obj.func)
        return obj.__name__

    def register(blynk, *args, interval=DEFAULT_INTERVAL, run_once=False, **kwargs):
        class Deco(object):
            def __init__(self, func):
                self.func = func
                if len(Timer.timers) >= MAX_TIMERS:
                    raise TimerError('Max allowed timers num={}'.format(MAX_TIMERS))
                _timer = _Timer(interval, func, run_once, *args, **kwargs)
                Timer.timers['{}_{}'.format(
                    len(Timer.timers), blynk._get_func_name(func))] = _timer

            def __call__(self, *f_args, **f_kwargs):
                return self.func(*f_args, **f_kwargs)

        return Deco

    @staticmethod
    def stop(t_id):
        timer = Timer.timers.get(t_id, None)
        if timer is None:
            raise TimerError('Timer id={} not found'.format(t_id))
        Timer.timers[t_id].stopped = True

    @staticmethod
    def is_stopped(t_id):
        timer = Timer.timers.get(t_id, None)
        if timer is None:
            raise TimerError('Timer id={} not found'.format(t_id))
        return timer.stopped

    def get_timers(self):
        states = {True: 'Stopped', False: 'Running'}
        return {k: states[v.stopped] for k, v in self.timers.items()}

    def run(self):
        # select call used cause time.sleep loads CPU up to 100% with small polling time
        select.select([], [], [], WAIT_SEC)
        timers_intervals = [curr_timer.run() for curr_timer in Timer.timers.values() if not curr_timer.stopped]
        if not timers_intervals and self.no_timers_err:
            raise TimerError('Running timers not found')
        return timers_intervals


class _Timer(object):
    def __init__(self, interval, deco, run_once, *args, **kwargs):
        self.interval = interval
        self.deco = deco
        self.args = args
        self.run_once = run_once
        self.kwargs = kwargs
        self.fire_time = None
        self.fire_time_prev = None
        self.stopped = False

    def run(self):
        timer_real_interval = 0
        if self.fire_time is None:
            self.fire_time = time.time() + self.interval
        if self.fire_time_prev is None:
            self.fire_time_prev = time.time()
        curr_time = time.time()
        if curr_time >= self.fire_time:
            self.deco(*self.args, **self.kwargs)
            if self.run_once:
                self.stopped = True
            timer_real_interval = curr_time - self.fire_time_prev
            self.fire_time_prev = self.fire_time
            self.fire_time = curr_time + self.interval
        return timer_real_interval
