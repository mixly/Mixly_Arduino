"""
    BlynkTimer
    blynk-library-python

    Module for launching timed Blynk actions
    with polling

"""

import time


class BlynkTimer:
    '''Executes functions after a defined period of time'''
    _MAX_TIMERS = 16

    def __init__(self):
        self.timers = []
        self.ids = self._get_unique_id()

    def _get_unique_id(self, current=0):
        '''yields unique id for new timer'''
        numId = current
        while numId < self._MAX_TIMERS:
            yield numId
            numId += 1

    def _add(self, func, **kwargs):
        '''Inits Timer'''
        timerId = next(self.ids)
        timer = Timer(timerId, func, **kwargs)
        self.timers.append(timer)
        return timer

    def _get(self, timerId):
        '''Gets timer by id'''
        timer = [t for t in self.timers if t.id == timerId]
        if len(timer) <= 0:
            return None
        return timer[0]

    def _delete(self, timerId):
        '''Deletes timer'''
        timer = self._get(timerId)
        timer.disable()
        self.timers = [t for t in self.timers if t.id != timerId]
        num_timers = self.get_num_timers()[0]
        self.ids = self._get_unique_id(current=num_timers)
        return timerId

    def get_num_timers(self):
        '''Returns number of used timer slots'''
        num_timers = len(self.timers)
        return (num_timers, self._MAX_TIMERS)

    def is_enabled(self, timerId):
        '''Returns true if timer is enabled'''
        timer = self._get(timerId)
        return timer.enabled

    def set_interval(self, value, func):
        '''Sets time interval for function'''
        timer = self._add(func)
        timer.set_interval(value)
        return timer.id

    def set_timeout(self, value, func):
        '''Runs function once after timeout'''
        timer = self._add(func, post_run=self._delete)
        timer.set_interval(value)
        return timer.id

    def enable(self, timerId):
        '''Enables timer'''
        timer = self._get(timerId)
        timer.enable()
        return timerId

    def disable(self, timerId):
        '''Disables timer'''
        timer = self._get(timerId)
        timer.disable()
        return timerId

    def run(self):
        '''Polls timers'''
        [t.run() for t in self.timers]


class Timer:
    '''Runs function after specific interval'''

    def __init__(self, id, func, **kwargs):
        self.id = id
        self.func = func
        self.interval = None
        self.start_time = None
        self.enabled = False
        self.on_post_run = kwargs.get('post_run', None)

    def _handle_post_run(self):
        '''handles post run events'''
        self.start_time += self.interval
        if self.on_post_run:
            return self.on_post_run(self.id)

    def enable(self):
        '''enables Timer'''
        self.enabled = True
        self.start_time = time.time()

    def disable(self):
        '''disables timer'''
        self.enabled = False
        self.start_time = None

    def set_interval(self, value):
        '''Sets Time Interval for calling function'''
        self.interval = value
        self.enable()

    def run(self):
        '''Runs function if interval has passed'''
        if not self.enabled:
            return
        now = time.time()
        if now - self.start_time > self.interval:
            self.func()
            self._handle_post_run()
