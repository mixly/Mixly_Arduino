#
# BSD 3-Clause License
#
# Copyright (c) 2018, Tomek D. Loboda All rights reserved.
#
# Redistribution and use in source and binary forms, with or without modification, are permitted provided that the
# following conditions are met:
#
# 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following
#    disclaimer.
#
# 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the
#    following disclaimer in the documentation and/or other materials provided with the distribution.
#
# 3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote
#    products derived from this software without specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
# INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
# DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
# SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
# SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
# WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE
# USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
#
# ----------------------------------------------------------------------------------------------------------------------

import random
import smbus2 as smbus
import time


# ======================================================================-===============================================
class Img(object):
    EMPTY         = 0x0000000000000000  # signs, symbols, and icons
    FULL          = 0xffffffffffffffff
    PLUS          = 0x0010107c10100000
    MINUS         = 0x0000003c00000000
    TIMES         = 0x006c38fe386c0000
    DIVIDED       = 0x00060c1830600000
    PERCENT       = 0x60660c1830660600
    EQUALS        = 0x00003c003c000000
    TILDA         = 0x000000365c000000
    CARET         = 0x0000008244281000
    BRACKET_RL    = 0x6030181818306000
    BRACKET_RR    = 0x060c1818180c0600
    BRACKET_SL    = 0x7818181818187800
    BRACKET_SR    = 0x1e18181818181e00
    BRACKET_AL    = 0x6030180c18306000
    BRACKET_AR    = 0x060c1830180c0600
    BRACKET_CL    = 0x7018180c18187000
    BRACKET_CR    = 0x0e18183018180e00
    DOT           = 0x0606000000000000
    COMMA         = 0x060c0c0c00000000
    COLON         = 0x0018180018180000
    SEMICOLON     = 0x0c18180018180000
    EXCLAM        = 0x180018183c3c1800
    QUEST         = 0x1800183860663c00
    AT            = 0x003c421a3a221c00
    AMPERSAND     = 0xfc66a6143c663c00
    DOLLAR        = 0x103c403804781000
    HASH          = 0x6c6cfe6cfe6c6c00
    ARROW_U       = 0x383838fe7c381000
    ARROW_D       = 0x10387cfe38383800
    ARROW_L       = 0x1018fcfefc181000
    ARROR_R       = 0x10307efe7e301000
    TRIANGLE_U    = 0xfefe7c7c38381000
    TRIANGLE_D    = 0x1038387c7cfefe00
    TRIANGLE_L    = 0xc0f0fcfefcf0c000
    TRIANGLE_R    = 0x061e7efe7e1e0600
    SUIT_HEARTS   = 0x10387cfefeee4400
    SUIT_DIAMONDS = 0x10387cfe7c381000
    SUIT_CLUBS    = 0x381054fe54381000
    SUIT_SPADES   = 0x38107cfe7c381000
    NOTE          = 0x060e0c0808281800
    NOTE_DBL      = 0x066eecc88898f000
    STAR          = 0x105438ee38541000
    APOSTR_R      = 0x0000000060303000
    APOSTR_L      = 0x0000000c18181800
    QUOTE         = 0x00000000286c6c00
    SLASH         = 0x02060c1830604000
    BACKSLASH     = 0x406030180c060200
    HOUSE         = 0xfe8282c66c381000
    UP_DOWN       = 0x1038541054381000
    LEFT_RIGHT    = 0x002844fe44280000
    EXCLAM_X2     = 0x6666006666666600
    BALL          = 0x00387c7c7c380000
    BALL_INV      = 0xffc7838383c7ffff
    CIRCLE        = 0x0038444444380000
    CIRCLE_INV    = 0xffc7bbbbbbc7ffff
    FEMALE        = 0x0c12129ca0c0f000
    MALE          = 0x38444438107c1000
    CHECK         = 0x00040a1120408000
    SUP_0         = 0x000000001c36361c
    SUP_1         = 0x000000001c080c08
    SUP_2         = 0x0000003c0c18301c
    SUP_3         = 0x0000001c3018301c
    PLUS_MINUS    = 0x007e0018187e1818
    COPYRIGHT     = 0x3c4299858599423c
    RESERVED      = 0x3c42a59da59d423c
    SHIFT_LEFT    = 0x0000cc663366cc00
    SHIFT_RIGHT   = 0x00003366cc663300
    FRAC_1_2      = 0xf03366cc7b3363c3
    FRAC_3_4      = 0x80e6acdbb463c403
    
    HEAD_U_R  = 0x7e81bda581a5817e  # eyes, lips, and a round head (U - up: happy)
    HEAD_D_R  = 0x7ea5bd8181a5817e  # ^ (D - down: sad)
    HEAD_F_R  = 0x7e81bd8181a5817e  # ^ (F - flat: neutral, confused, thinking, etc.)
    HEAD_U_S  = 0xff81bda581a581ff  # eyes, lips, and a square head
    HEAD_D_S  = 0xffa5bd8181a581ff
    HEAD_F_S  = 0xff81bd8181a581ff 
    FACE_U_S  = 0x00003c4200240000  # eyes and lips only (small)
    FACE_D_S  = 0x00423c0000240000
    FACE_F_S  = 0x00007e0000240000
    FACE_F_S_ = 0x00003c0000240000  # ^ [_ - short mouth]
    FACE_U_L  = 0x007e810000004200  # ^ (large)
    FACE_D_L  = 0x817e000000004200
    FACE_F_L  = 0x00ff000000004200
    FACE_F_L_ = 0x007e000000004200  # ^ [_ - short mouth]
    FACE_U_T  = 0x003c420024242400  # ^ (tall eyes)
    FACE_D_T  = 0x423c000024242400
    FACE_F_T  = 0x007e000024242400
    FACE_F_T_ = 0x003c000024242400
    LIPS_U    = 0x007e810000000000  # lips only
    LIPS_D    = 0x817e000000000000
    LIPS_F    = 0x007e000000000000
    LIPS_O    = 0x1824241800000000  # ^ (O - open: surprise)
    
    D0  = 0x3c66666e76663c00  # digits
    D1  = 0x7e1818181c181800
    D2  = 0x7e060c3060663c00
    D3  = 0x3c66603860663c00
    D4  = 0x30307e3234383000
    D5  = 0x3c6660603e067e00
    D6  = 0x3c66663e06663c00
    D7  = 0x1818183030667e00
    D8  = 0x3c66663c66663c00
    D9  = 0x3c66607c66663c00
    
    D0_ = 0x1c2222222222221c  # digits (thin)
    D1_ = 0x1c08080808080c08
    D2_ = 0x3e0408102020221c
    D3_ = 0x1c2220201820221c
    D4_ = 0x20203e2224283020
    D5_ = 0x1c2220201e02023e
    D6_ = 0x1c2222221e02221c
    D7_ = 0x040404081020203e
    D8_ = 0x1c2222221c22221c
    D9_ = 0x1c22203c2222221c
    
    _  = 0x0000000000000000  # space
    A  = 0x6666667e66663c00  # upper case letter
    B  = 0x3e66663e66663e00
    C  = 0x3c66060606663c00
    D  = 0x3e66666666663e00
    E  = 0x7e06063e06067e00
    F  = 0x0606063e06067e00
    G  = 0x3c66760606663c00
    H  = 0x6666667e66666600
    I  = 0x3c18181818183c00
    J  = 0x1c36363030307800
    K  = 0x66361e0e1e366600
    L  = 0x7e06060606060600
    M  = 0xc6c6c6d6feeec600
    N  = 0xc6c6e6f6decec600
    O  = 0x3c66666666663c00
    P  = 0x06063e6666663e00
    Q  = 0x603c766666663c00
    R  = 0x66361e3e66663e00
    S  = 0x3c66603c06663c00
    T  = 0x3c66603c06663c00
    U  = 0x7c66666666666600
    V  = 0x183c666666666600
    W  = 0xc6eefed6c6c6c600
    X  = 0xc6c66c386cc6c600
    Y  = 0x1818183c66666600
    Z  = 0x7e060c1830607e00
    
    a  = 0x7c667c603c000000  # lower case letter
    b  = 0x3e66663e06060600
    c  = 0x3c6606663c000000
    d  = 0x7c66667c60606000
    e  = 0x3c067e663c000000
    f  = 0x0c0c3e0c0c6c3800
    g  = 0x3c607c66667c0000
    h  = 0x6666663e06060600
    i  = 0x3c18181800180000
    j  = 0x1c36363030003000
    k  = 0x66361e3666060600
    l  = 0x1818181818181800
    m  = 0xd6d6feeec6000000
    n  = 0x6666667e3e000000
    o  = 0x3c6666663c000000
    p  = 0x06063e66663e0000
    q  = 0xf0b03c36363c0000
    r  = 0x060666663e000000
    s  = 0x3e403c027c000000
    t  = 0x1818187e18180000
    u  = 0x7c66666666000000
    v  = 0x183c666600000000
    w  = 0x7cd6d6d6c6000000
    x  = 0x663c183c66000000
    y  = 0x3c607c6666000000
    z  = 0x3c0c18303c000000
    
    mu = 0x03063e6666660000  # greek
    
    DIG    = [D0,  D1,  D2,  D3,  D4,  D5,  D6,  D7,  D8,  D9 ]
    DIG_   = [D0_, D1_, D2_, D3_, D4_, D5_, D6_, D7_, D8_, D9_]  # thin
    LET_LC = [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z]
    LET_UC = [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z]
    LET    = LET_LC + LET_UC


# ======================================================================-===============================================
class Matrix(object):
    ''' 
    An HT16K33-based LED matrix I2C driver.
    
    Naming brevity is prefered over clarity (e.g., 'lit' over 'set_brightness') for the most basic operations. In my
    opinion that results in a more succinct and therefore more readable code. This is especially true given the small
    size and narrow scope of this class. After all, this is a utility class.
    
    This class can be instructed to finish all processing ASAP which is useful when it is instantiated in a separate
    thread or process.
    
    All pertinent methods return 'self' to enable chaining.
    
    NOTE: The implementation presented here is complicated only slightly by the multiprocessing entanglement.
    '''
    
    _CMD_OSCILL = 0x21  # command register (oscillator)
    _CMD_DISP   = 0x81  # ^ (display)
    _CMD_LIT    = 0xE0  # ^ (brightness but it is called "lit" for brevity)
    
    ADDR    = 0x70  # default
    BUS_NUM = 1     # ^
    
    LIT     =  0  # default
    LIT_MIN =  0
    LIT_MAX = 15
    
    LIT_LST_UP      = list(range(LIT_MIN, LIT_MAX + 1))  # brightness levels (up)
    LIT_LST_DN      = list(reversed(LIT_LST_UP))         # ^ (down)
    LIT_LST_BREATHE = LIT_LST_UP + LIT_LST_DN            # ^ (up then down)
    
    _addr    = ADDR
    _bus_num = BUS_NUM
    _lit     = LIT
    _bus     = None
    _buff    = bytearray([0] * 16)  # frame buffer
    
    _evt_stop    = None  # for threading and multiprocessing use
    _evt_end_all = None  # ^
    _evt_end_one = None  # ^
    
    # ------------------------------------------------------------------------------------------------------------------
    def __init__(self, addr=ADDR, bus_num=BUS_NUM, lit=LIT, evt_stop=None, evt_end_all=None, evt_end_one=None):
        self._addr        = addr
        self._bus_num     = bus_num
        self._lit         = lit
        self._bus         = smbus.SMBus(bus_num)
        self._evt_stop    = evt_stop
        self._evt_end_all = evt_end_all
        self._evt_end_one = evt_end_one
        
        self._bus.write_byte(self._addr, self._CMD_OSCILL)           # turn the oscillator on
        self._bus.write_byte(self._addr, self._CMD_DISP)             # turn the display on (set blink to off)
        self._bus.write_byte(self._addr, self._CMD_LIT | self._lit)  # set the display brightness
        
        self.clr().set()
    
    # ------------------------------------------------------------------------------------------------------------------
    def __del__(self):
        self.clr().set()
    
    # ------------------------------------------------------------------------------------------------------------------
    def _do_end(self):
        a = self._evt_stop
        b = self._evt_end_all
        c = self._evt_end_one
        return (a is not None and a.is_set()) or (b is not None and b.is_set()) or (c is not None and c.is_set())
    
    # ------------------------------------------------------------------------------------------------------------------
    def _wr_byte(self, cmd, val):
        self._bus.write_byte_data(self._addr, cmd, val & 0xFF)
        return self
    
    # ------------------------------------------------------------------------------------------------------------------
    def _wr_word(self, cmd, val):
        self._bus.write_byte_data(self._addr, cmd, val & 0xFFFF)
        return self
    
    # ------------------------------------------------------------------------------------------------------------------
    def clr(self):
        ''' Clears the buffer. '''
        
        for i in range(len(self._buff)):
            self._buff[i] = 0
        return self
    
    # ------------------------------------------------------------------------------------------------------------------
    def get_img(self):
        '''
        Returns the image from the frame buffer as a hexagonal number.
        
        Note that this will be the image currently being displayed only if no changes to the frame buffer has occurred
        since the last call to 'set()'.
        
        This method is useful for storing images for later use.
        '''
        
        # TODO: Implement.
        return 0x0
    
    # ------------------------------------------------------------------------------------------------------------------
    def hold(self, t):
        '''
        Holds the current state of the matrix for the specified number of seconds.
        
        In a multiprocessing context, a series of sleep is performed instead of one long sleep to allow for
        interruptions.
        '''
        
        # No stop requests will be incoming OR short sleep time:
        if (self._evt_stop is None and self._evt_end_all is None and self._evt_end_one is None) or (t <= 0.01):
            time.sleep(t)
        
        # Must check for stopping requests:
        else:
            t_elapsed = 0
            while t_elapsed < t:
                if self._do_end():
                    return self
                
                t_ = min(t - t_elapsed, 0.01)
                time.sleep(t_)
                t_elapsed += t_
        
        return self
    
    # ------------------------------------------------------------------------------------------------------------------
    def img(self, img, hold_t=0, do_set=True):
        return self.img_hex(img, hold_t, do_set)
    
    # ------------------------------------------------------------------------------------------------------------------
    def img_bin(self, img, hold_t=0, do_set=True):
        ''' Expects a binary array as the image. Sets the display automatically and can hold. '''

        # TODO: Check the implementation because I have since moved to HEX images and this may no longer work.
        
        if self._do_end(): return self
        
        for y, row in enumerate(img):
            for x in range(8):
                self.px(x, y, 1 if (row & (1 << x)) else 0)
        
        if do_set:
            self.set()
        
        if hold_t > 0:
            self.hold(hold_t)
        
        return self
     
    # ------------------------------------------------------------------------------------------------------------------
    def img_hex(self, img, hold_t=0, do_set=True):
        ''' Expects a hexagonal number as the image. Sets the display automatically and can hold. '''

        if self._do_end(): return self
        
        for y in range(8):
            row = (img >> y * 8) & 0xFF
            for x in range(8):
                self.px(x, y, 1 if (row & (1 << x)) else 0)
        
        if do_set:
            self.set()
        
        if hold_t > 0:
            self.hold(hold_t)
        
        return self
    
    # ------------------------------------------------------------------------------------------------------------------
    def lit(self, lvl):
        ''' Sets brightness level. '''
        
        if self._do_end(): return self
        
        self._lit = min(max(lvl, self.LIT_MIN), self.LIT_MAX)
        self._bus.write_byte(self._addr, self._CMD_LIT | self._lit)
        return self
    
    # ------------------------------------------------------------------------------------------------------------------
    def lit_rel(self, delta):
        ''' Sets relative brightness level. '''
        
        return self.lit(self._lit + delta)
    
    # ------------------------------------------------------------------------------------------------------------------
    def _px(self, x, y, val, lit_lvl=None):
        ''' Alters one pixel. '''
        
        if lit_lvl is not None:
            self.lit(lit_lvl)
        
        if (x < 0) or (x > 7) or (y < 0) or (y > 7):
            return
        
        x = (x + 7) % 8
        y = y * 2
        if not val:
            self._buff[y] &= ~(1 << x)
        else:
            self._buff[y] |=  (1 << x)
        
        return self
    
    # ------------------------------------------------------------------------------------------------------------------
    def _px_lst(self, lst):
        ''' Alters a list of pixels. '''
        
        for l in lst:
            x    = l[0]
            y    = l[1]
            val  = l[2]
            
            if len(l) == 4 and l[3] is not None:
                self.lit(l[3])
            
            if (x < 0) or (x > 7) or (y < 0) or (y > 7): return
            
            x = (x + 7) % 8
            y = y * 2
            if not val:
                self._buff[y] &= ~(1 << x)
            else:
                self._buff[y] |=  (1 << x)
        
        return self
    
    # ------------------------------------------------------------------------------------------------------------------
    def px(self, a, b=None, c=None, d=None):
        '''
        Performs dispatch based on the type of the first argument. Consequently, a single pixel or a list of pixels
        will be set.
        
        For the one pixel case, the three first arguments are required:
        
            a=x, b=y, c=val, d=lit_lvl
        
        Only the first argument is required for the list case:
        
            a = [(x, y, val, lit_lvl), ...]
        '''
        
        if self._do_end(): return self
        
        if isinstance(a, int):
            return self._px(a, b, c, d)
        else:
            return self._px_lst(a)
    
    # ------------------------------------------------------------------------------------------------------------------
    def _px01(self, a, b=None, c=None, d=None):
        if self._do_end(): return self
        
        if isinstance(a, int):
            return self._px(a, b, c, d)
        else:
            return self._px_lst([(a_[0], a_[1], c) for a_ in a])
                # TODO: How to inject lit_lvl here in a nice way?
    
    # ------------------------------------------------------------------------------------------------------------------
    def px0(self, a, b=None): return self._px01(a, b, 0)  # ^
    def px1(self, a, b=None): return self._px01(a, b, 1)  # ^
    
    # ------------------------------------------------------------------------------------------------------------------
    def set(self, do_force=False):
        ''' Writes the frame buffer to the display. '''
        
        if self._do_end() and not do_force: return self

        for y, val in enumerate(self._buff):
            self._wr_byte(y, val)
        return self


# ======================================================================-===============================================
class MatrixMotion(Matrix):
    '''
    Animations for the LED matrix class.
    
    In each motion method, the speed is specified by a pair of arguments: 't_frame' which controls the inter-frame
    delay and 't_wait' which controls inter-loop delay.
    
    If embedded within a new thread/process, this class respects both end-all and end-one requests it may receive. The
    end-one event has been exposed specifically for the use by this class and the intended purpose is to end a
    long-running (possibly infinite) animation.
    
    Chaining is possible much like it is with the Matrix class itself.
    '''
    
    DIR_R =  1
    DIR_L = -1
    DIR_D =  2
    DIR_U = -2
    
    T_PRE   = 0      # default
    T_POST  = 0      # ^
    T_FRAME = 0.025  # ^
    T_WAIT  = 0.5    # ^
    
    POINTS_LIFELINE = [(0,6), (1,6), (2,5), (3,1), (4,5), (5,6), (6,6), (7,6)]  # just an example
    
    # ------------------------------------------------------------------------------------------------------------------
    def breathe(self, n_rep=0, n_loop=1, lit_seq=None, lit_min=Matrix.LIT_MIN, lit_max=Matrix.LIT_MAX,
                t_pre=T_PRE, t_post=T_POST, t_frame=T_FRAME, t_wait=T_WAIT):
        self.lit(lit_min)  # no clr() here!
        if t_pre > 0:
            self.hold(t_pre)
        
        lit_seq = lit_seq or (list(range(lit_min, lit_max + 1)) + list(reversed(range(lit_min, lit_max + 1)))) * n_loop
        
        i = 0
        while True:
            if lit_min == lit_max:
                self.hold(t_frame)
            else:
                for j in lit_seq:
                    self.lit(j).hold(t_frame)

            self.hold(t_wait)
            
            i += 1
            if self._do_end() or (n_rep > 0 and i == n_rep):
                break
        
        self.lit(lit_min)
        if t_post > 0:
            self.hold(t_post)
        
        if (self._evt_end_one is not None) and (self._evt_end_one.is_set()):
            self._evt_end_one.clear()
        
        return self
    
    # ------------------------------------------------------------------------------------------------------------------
    def image(self, img, n_rep=0, n_loop=1, lit_seq=None, lit_min=Matrix.LIT_MIN, lit_max=Matrix.LIT_MAX,
              t_pre=T_PRE, t_post=T_POST, t_frame=T_FRAME, t_wait=T_WAIT):
        return self.img(img).breathe(n_rep, n_loop, lit_seq, lit_min, lit_max, t_pre, t_post, t_frame, t_wait).clr().set()
    
    # ------------------------------------------------------------------------------------------------------------------
    def lifeline(self, trace=1, n_rep=0, lit_min=Matrix.LIT_MIN, lit_max=Matrix.LIT_MAX,
                 t_pre=T_PRE, t_post=T_POST, t_frame=T_FRAME, t_wait=T_WAIT):
        return self.points_seq(self.POINTS_LIFELINE, trace, False, n_rep, lit_min, lit_max, t_pre, t_post, t_frame, t_wait)
    
    # ------------------------------------------------------------------------------------------------------------------
    def line(self, xy=5, trace=1, dir_=DIR_R, do_rev=False, n_rep=0, lit_min=Matrix.LIT_MIN, lit_max=Matrix.LIT_MAX,
             t_pre=T_PRE, t_post=T_POST, t_frame=T_FRAME, t_wait=T_WAIT):
        self.lit(self.LIT_MIN).clr().set()
        if t_pre > 0:
            self.hold(t_pre)
        
        if   dir_ == self.DIR_R: points = [(x, xy) for x in          range(8) ]
        elif dir_ == self.DIR_L: points = [(x, xy) for x in reversed(range(8))]
        elif dir_ == self.DIR_D: points = [(xy, y) for y in          range(8) ]
        elif dir_ == self.DIR_U: points = [(xy, y) for y in reversed(range(8))]
        else: return self
        
        i = 0
        while True:
            self.points_seq(points, trace, do_rev, 1, lit_min, lit_max, 0, 0, t_frame, t_wait)
            
            i += 1
            if self._do_end() or (n_rep > 0 and i == n_rep):
                break
        
        if t_post > 0:
            self.hold(t_post)
        
        if (self._evt_end_one is not None) and (self._evt_end_one.is_set()):
            self._evt_end_one.clear()
        
        return self
    
    # ------------------------------------------------------------------------------------------------------------------
    def pixel(self, x, y, n_rep=0, n_loop=1, lit_seq=None, lit_min=Matrix.LIT_MIN, lit_max=Matrix.LIT_MAX,
              t_pre=T_PRE, t_post=T_POST, t_frame=T_FRAME, t_wait=T_WAIT):
        return self.px1(x,y).set().breathe(n_rep, n_loop, lit_seq, lit_min, lit_max, t_pre, t_post, t_frame, t_wait).px0(x,y).set()
    
    # ------------------------------------------------------------------------------------------------------------------
    def points_seq(self, points, trace=1, do_rev=False, n_rep=0, lit_min=Matrix.LIT_MIN, lit_max=Matrix.LIT_MAX,
                   t_pre=T_PRE, t_post=T_POST, t_frame=T_FRAME, t_wait=T_WAIT):
        self.lit(self.LIT_MIN).clr().set()
        if t_pre > 0:
            self.hold(t_pre)
        
        if do_rev:
            points = points + list(reversed(points))
        
        i = 0
        while True:
            for p in points:
                self.px1([p]).set().hold(t_frame).px0([p]).set()
            self.hold(t_wait)
            
            i += 1
            if self._do_end() or (n_rep > 0 and i == n_rep):
                break
        
        if t_post > 0:
            self.hold(t_post)
        
        if (self._evt_end_one is not None) and (self._evt_end_one.is_set()):
            self._evt_end_one.clear()
        
        return self
    
    # ------------------------------------------------------------------------------------------------------------------
    def points_rand(self, n_points=1, trace=1, n_rep=0, lit_min=Matrix.LIT_MIN, lit_max=Matrix.LIT_MAX,
                    t_pre=T_PRE, t_post=T_POST, t_frame=T_FRAME, t_wait=T_WAIT):
        self.lit(lit_min).clr().set()
        if t_pre > 0:
            self.hold(t_pre)
        
        i = 0
        while True:
            points = [(random.randint(0, 7), random.randint(0, 7)) for _ in range(n_points)]
            self.px1(points).set().breathe(1, 1, None, lit_min, lit_max, 0, 0, t_frame, t_wait).px0(points).set()
            
            i += 1
            if self._do_end() or (n_rep > 0 and i == n_rep):
                break
        
        if t_post > 0:
            self.hold(t_post)
        
        if (self._evt_end_one is not None) and (self._evt_end_one.is_set()):
            self._evt_end_one.clear()
        
        return self
    
    # ------------------------------------------------------------------------------------------------------------------
    def points_rand_walk(self, n_points=1, n_rep=0, lit_min=Matrix.LIT_MIN, lit_max=Matrix.LIT_MAX,
                         t_pre=T_PRE, t_post=T_POST, t_frame=T_FRAME, t_wait=T_WAIT):
        self.lit(lit_min).clr().set()
        if t_pre > 0:
            self.hold(t_pre)
        
        points = [[random.randint(0, 7), random.randint(0, 7)] for _ in range(n_points)]  # initial particle positions
        
        i = 0
        while True:
            self.px1(points).set().breathe(1, 1, None, lit_min, lit_max, 0, 0, t_frame, t_wait).px0(points).set()
            
            # Perform a random walk step for each particle:
            for j, p in enumerate(points):
                p = points[j]
                p[0] = min(max(random.randrange(p[0] - 1, p[0] + 2), 0), 7)
                p[1] = min(max(random.randrange(p[1] - 1, p[1] + 2), 0), 7)
            
            i += 1
            if self._do_end() or(n_rep > 0 and i == n_rep):
                break
        
        if t_post > 0:
            self.hold(t_post)
        
        if (self._evt_end_one is not None) and (self._evt_end_one.is_set()):
            self._evt_end_one.clear()
        
        return self
    
    # ------------------------------------------------------------------------------------------------------------------
    def spectrum_analyzer(self, n_rep=0, lit_min=Matrix.LIT_MIN, lit_max=Matrix.LIT_MAX,
                          t_pre=T_PRE, t_post=T_POST, t_frame=T_FRAME, t_wait=T_WAIT):
        self.lit(lit_min).clr().set()
        
        vol = [0] * 8  # volume
        for x in range(8):
            self.px1(x, 7)
        
        if t_pre > 0:
            self.hold(t_pre)
        
        i = 0
        while True:
            for x in range(8):
                vol[x] = random.randint(0,7)  # next set of volume values
                    # random.choices(range(8), [2,2,2,2,2,2,2,1])[0]
                
                for y in range(0, 8 - vol[x]) : self.px0(x, y)
                for y in range(7 - vol[x], 8) : self.px1(x, y)
            self.set().breathe(1, 1, None, lit_min, lit_max, 0, 0, t_frame, t_wait)
            
            i += 1
            if self._do_end() or (n_rep > 0 and i == n_rep):
                break
        
        if t_post > 0:
            self.hold(t_post / 2)

        # Let the volume bars fall down:
        for j in range(max(vol)):
            for x in range(8):
                vol[x] = max(vol[x] - 1, 0)
                self.px0(x, 6 - vol[x]).set().hold(t_wait)
        
        if t_post > 0:
            self.hold(t_post)

        if (self._evt_end_one is not None) and (self._evt_end_one.is_set()):
            self._evt_end_one.clear()
        
        return self


# ======================================================================-===============================================
if __name__ == '__main__':
    import signal
    import sys
    
    def signal_hdl(signal, frame): sys.exit()
    signal.signal(signal.SIGINT, signal_hdl)  # CTRL+C exits
    
    # (1) Set up the tests:
    do_test_lit    = 0 == 1  # test brightness change?           [Matrix]
    do_test_px     = 0 == 1  # test pixels-level manipulations?  [Matrix]
    do_test_img    = 0 == 1  # test image?                       [Matrix]
    do_test_alpha  = 0 == 1  # test alphanumeric images?         [Matrix]
    do_test_motion = 1 == 1  # test animations?                  [MatrixMotion]
    
    lit_n = 3      # number of time to cycle through the brightness range
    lit_t = 0.01   # delay between brightness changes
    px_t  = 0.025  # delay between pixels
    img_t = 0.5    # delay between images
    let_t = 0.1    # delay between letters (technically they are also images)
    
    mat = Matrix()
    
    # (2) Run the tests:
    # (2.1) Brightness:
    if do_test_lit:
        for (x,y) in [(0,0), (0,7), (7,7), (7,0)]:
            mat.px1(x,y).set()
            for _ in range(lit_n):
                for i in Matrix.LIT_LST_BREATHE: mat.lit(i).hold(lit_t)
            mat.px0(x,y).set()
    
    # (2.2) Pixels:
    if do_test_px:
        for x in range(8):
            for y in range(8):
                mat.px1(x,y).set().hold(px_t)
        if do_test_lit:
            for _ in range(lit_n):
                for i in Matrix.LIT_LST_BREATHE: mat.lit(i).hold(lit_t)
        mat.hold(1).clr().set()
        
        for y in range(8):
            for x in range(8):
                mat.px1(x,y).set().hold(px_t)
        if do_test_lit:
            for _ in range(lit_n):
                for i in Matrix.LIT_LST_BREATHE: mat.lit(i).hold(lit_t)
        mat.hold(1).clr().set()
    
    # (2.3) Images:
    if do_test_img:
        i = Img
        mat.img(i.PLUS, img_t).img(i.EXCLAM, img_t).img(i.QUEST, img_t).clr()
        
        mat.img(i.FACE_U_S, img_t).img(i.FACE_F_S, img_t).img(i.FACE_D_S, img_t).img(i.FACE_F_S_, img_t).clr()
        mat.img(i.FACE_U_L, img_t).img(i.FACE_F_L, img_t).img(i.FACE_D_L, img_t).img(i.FACE_F_L_, img_t).clr()
    
    # (2.4) Alphanumeric:
    if do_test_alpha:
        for i in Img.LET:  mat.img(i, let_t)
        for i in Img.DIG:  mat.img(i, let_t)
        for i in Img.DIG_: mat.img(i, let_t)
        mat.clr().set()
    
    # (2.5) Animations:
    if do_test_motion:
        mm = MatrixMotion()
        mm.pixel(6,6, 5, t_frame=0.01, t_wait=0.25)
        
        mm.px1([(x,7) for x in range(8)]).set()
        mm.breathe(3, 1, lit_seq=[4,3,2,1,0], t_frame=0.05, t_wait=0.5)
        
        mm.px1([(x,6) for x in range(8)]).set()
        mm.breathe(3, 1, lit_seq=[9,8,7,6,5,4,3,2,1,0], t_frame=0.05, t_wait=0.5)
        
        mm.px1([(x,5) for x in range(8)]).set()
        mm.breathe(3, 1, lit_seq=[15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0], t_frame=0.05, t_wait=0.5)
        
        mm.line(5, 1, MatrixMotion.DIR_R, False, 3, t_frame=0.025, t_wait=0.1)
        mm.line(2, 1, MatrixMotion.DIR_L, False, 3, t_frame=0.025, t_wait=0.1)
        mm.line(5, 1, MatrixMotion.DIR_D, False, 3, t_frame=0.025, t_wait=0.1)
        mm.line(2, 1, MatrixMotion.DIR_U, False, 3, t_frame=0.025, t_wait=0.1)
        
        mm.line(5, 1, MatrixMotion.DIR_R, True,  3, t_frame=0.05, t_wait=0)
        mm.line(2, 1, MatrixMotion.DIR_L, True,  3, t_frame=0.05, t_wait=0)
        mm.line(5, 1, MatrixMotion.DIR_D, True,  3, t_frame=0.05, t_wait=0)
        mm.line(2, 1, MatrixMotion.DIR_U, True,  3, t_frame=0.05, t_wait=0)
        
        mm.lifeline(1, 3)
        
        mm.points_rand( 1, n_rep=15, lit_max=Matrix.LIT_MIN, t_frame=0.1, t_wait=0.025, t_post=0.25)
        mm.points_rand( 2, n_rep=15, lit_max=Matrix.LIT_MIN, t_frame=0.1, t_wait=0.025, t_post=0.25)
        mm.points_rand(16, n_rep=15, lit_max=Matrix.LIT_MIN, t_frame=0.1, t_wait=0.025, t_post=0.25)
        
        mm.points_rand( 1, n_rep=10, lit_max=10, t_frame=0.01, t_wait=0.05, t_post=0.5)
        mm.points_rand( 2, n_rep=10, lit_max=10, t_frame=0.01, t_wait=0.05, t_post=0.5)
        mm.points_rand( 8, n_rep=10, lit_max=10, t_frame=0.01, t_wait=0.05, t_post=0.5)
        mm.points_rand(16, n_rep=10, lit_max=10, t_frame=0.01, t_wait=0.05, t_post=0.5)
        mm.points_rand(32, n_rep=10, lit_max=10, t_frame=0.01, t_wait=0.05, t_post=0.5)
        
        mm.points_rand_walk( 1, n_rep=50,lit_max=Matrix.LIT_MIN, t_frame=0.05, t_wait=0.025, t_post=0.25)
        mm.points_rand_walk( 3, n_rep=50,lit_max=Matrix.LIT_MIN, t_frame=0.05, t_wait=0.025, t_post=0.25)
        mm.points_rand_walk( 5, n_rep=50,lit_max=Matrix.LIT_MIN, t_frame=0.05, t_wait=0.025, t_post=0.25)
        
        mm.spectrum_analyzer(n_rep= 75, lit_max=Matrix.LIT_MIN, t_pre=0.5, t_frame=0.035, t_wait=0.01, t_post=0.5)
        mm.spectrum_analyzer(n_rep=150, lit_max=Matrix.LIT_MIN, t_pre=0.5, t_frame=0.001, t_wait=0.01, t_post=0.5)
        
        mm.image(Img.FACE_U_S, 3, 1, t_pre=0.75, t_post=0.75, t_frame=0.005, t_wait=0.05)
        mm.image(Img.FACE_U_L, 2, 2, t_pre=0.75, t_post=0.75, t_frame=0.005, t_wait=0.5)