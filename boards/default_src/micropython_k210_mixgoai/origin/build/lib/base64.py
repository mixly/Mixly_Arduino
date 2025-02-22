import re
import struct
import binascii

__all__ = [
    "encode",
    "decode",
    "encodebytes",
    "decodebytes",
    "b64encode",
    "b64decode",
    "b32encode",
    "b32decode",
    "b16encode",
    "b16decode",
    "standard_b64encode",
    "standard_b64decode",
    "urlsafe_b64encode",
    "urlsafe_b64decode",
]

bytes_types = (bytes, bytearray)


def _bytes_from_decode_data(s):
    if isinstance(s, str):
        try:
            return s.encode("ascii")
        except:
            raise ValueError("string argument should contain only ASCII characters")
    elif isinstance(s, bytes_types):
        return s
    else:
        raise TypeError(
            "argument should be bytes or ASCII string, not %s" % s.__class__.__name__
        )


def b64encode(s, altchars=None):
    if not isinstance(s, bytes_types):
        raise TypeError("expected bytes, not %s" % s.__class__.__name__)
    encoded = binascii.b2a_base64(s)[:-1]
    if altchars is not None:
        if not isinstance(altchars, bytes_types):
            raise TypeError("expected bytes, not %s" % altchars.__class__.__name__)
        assert len(altchars) == 2, repr(altchars)
        return encoded.translate(bytes.maketrans(b"+/", altchars))
    return encoded


def b64decode(s, altchars=None, validate=False):
    s = _bytes_from_decode_data(s)
    if altchars is not None:
        altchars = _bytes_from_decode_data(altchars)
        assert len(altchars) == 2, repr(altchars)
        s = s.translate(bytes.maketrans(altchars, b"+/"))
    if validate and not re.match(b"^[A-Za-z0-9+/]*={0,2}$", s):
        raise binascii.Error("Non-base64 digit found")
    return binascii.a2b_base64(s)


def standard_b64encode(s):
    return b64encode(s)


def standard_b64decode(s):
    return b64decode(s)


def urlsafe_b64encode(s):
    raise NotImplementedError()


def urlsafe_b64decode(s):
    raise NotImplementedError()


_b32alphabet = {
    0: b"A",
    9: b"J",
    18: b"S",
    27: b"3",
    1: b"B",
    10: b"K",
    19: b"T",
    28: b"4",
    2: b"C",
    11: b"L",
    20: b"U",
    29: b"5",
    3: b"D",
    12: b"M",
    21: b"V",
    30: b"6",
    4: b"E",
    13: b"N",
    22: b"W",
    31: b"7",
    5: b"F",
    14: b"O",
    23: b"X",
    6: b"G",
    15: b"P",
    24: b"Y",
    7: b"H",
    16: b"Q",
    25: b"Z",
    8: b"I",
    17: b"R",
    26: b"2",
}

_b32tab = [v[0] for k, v in sorted(_b32alphabet.items())]
_b32rev = dict([(v[0], k) for k, v in _b32alphabet.items()])


def b32encode(s):
    if not isinstance(s, bytes_types):
        raise TypeError("expected bytes, not %s" % s.__class__.__name__)
    quanta, leftover = divmod(len(s), 5)
    if leftover:
        s = s + bytes(5 - leftover)  # Don't use += !
        quanta += 1
    encoded = bytearray()
    for i in range(quanta):
        c1, c2, c3 = struct.unpack("!HHB", s[i * 5 : (i + 1) * 5])
        c2 += (c1 & 1) << 16
        c3 += (c2 & 3) << 8
        encoded += bytes(
            [
                _b32tab[c1 >> 11],
                _b32tab[(c1 >> 6) & 0x1F],
                _b32tab[(c1 >> 1) & 0x1F],
                _b32tab[c2 >> 12],
                _b32tab[(c2 >> 7) & 0x1F],
                _b32tab[(c2 >> 2) & 0x1F],
                _b32tab[c3 >> 5],
                _b32tab[c3 & 0x1F],
            ]
        )
    if leftover == 1:
        encoded = encoded[:-6] + b"======"
    elif leftover == 2:
        encoded = encoded[:-4] + b"===="
    elif leftover == 3:
        encoded = encoded[:-3] + b"==="
    elif leftover == 4:
        encoded = encoded[:-1] + b"="
    return bytes(encoded)


def b32decode(s, casefold=False, map01=None):
    s = _bytes_from_decode_data(s)
    quanta, leftover = divmod(len(s), 8)
    if leftover:
        raise binascii.Error("Incorrect padding")
    if map01 is not None:
        map01 = _bytes_from_decode_data(map01)
        assert len(map01) == 1, repr(map01)
        s = s.translate(bytes.maketrans(b"01", b"O" + map01))
    if casefold:
        s = s.upper()
    padchars = s.find(b"=")
    if padchars > 0:
        padchars = len(s) - padchars
        s = s[:-padchars]
    else:
        padchars = 0

    parts = []
    acc = 0
    shift = 35
    for c in s:
        val = _b32rev.get(c)
        if val is None:
            raise binascii.Error("Non-base32 digit found")
        acc += _b32rev[c] << shift
        shift -= 5
        if shift < 0:
            parts.append(binascii.unhexlify(bytes("%010x" % acc, "ascii")))
            acc = 0
            shift = 35
    last = binascii.unhexlify(bytes("%010x" % acc, "ascii"))
    if padchars == 0:
        last = b""
    elif padchars == 1:
        last = last[:-1]
    elif padchars == 3:
        last = last[:-2]
    elif padchars == 4:
        last = last[:-3]
    elif padchars == 6:
        last = last[:-4]
    else:
        raise binascii.Error("Incorrect padding")
    parts.append(last)
    return b"".join(parts)


def b16encode(s):
    if not isinstance(s, bytes_types):
        raise TypeError("expected bytes, not %s" % s.__class__.__name__)
    return binascii.hexlify(s).upper()


def b16decode(s, casefold=False):
    s = _bytes_from_decode_data(s)
    if casefold:
        s = s.upper()
    if re.search(b"[^0-9A-F]", s):
        raise binascii.Error("Non-base16 digit found")
    return binascii.unhexlify(s)


MAXLINESIZE = 76
MAXBINSIZE = (MAXLINESIZE // 4) * 3


def encode(input, output):
    while True:
        s = input.read(MAXBINSIZE)
        if not s:
            break
        while len(s) < MAXBINSIZE:
            ns = input.read(MAXBINSIZE - len(s))
            if not ns:
                break
            s += ns
        line = binascii.b2a_base64(s)
        output.write(line)


def decode(input, output):
    while True:
        line = input.readline()
        if not line:
            break
        s = binascii.a2b_base64(line)
        output.write(s)


def encodebytes(s):
    if not isinstance(s, bytes_types):
        raise TypeError("expected bytes, not %s" % s.__class__.__name__)
    pieces = []
    for i in range(0, len(s), MAXBINSIZE):
        chunk = s[i : i + MAXBINSIZE]
        pieces.append(binascii.b2a_base64(chunk))
    return b"".join(pieces)


def encodestring(s):
    import warnings

    warnings.warn(
        "encodestring() is a deprecated alias, use encodebytes()", DeprecationWarning, 2
    )
    return encodebytes(s)


def decodebytes(s):
    if not isinstance(s, bytes_types):
        raise TypeError("expected bytes, not %s" % s.__class__.__name__)
    return binascii.a2b_base64(s)


def decodestring(s):
    import warnings

    warnings.warn(
        "decodestring() is a deprecated alias, use decodebytes()", DeprecationWarning, 2
    )
    return decodebytes(s)


def main():
    import sys, getopt

    try:
        opts, args = getopt.getopt(sys.argv[1:], "deut")
    except getopt.error as msg:
        sys.stdout = sys.stderr
        print(msg)
        print(
            """usage: %s [-d|-e|-u|-t] [file|-]
        -d, -u: decode
        -e: encode (default)
        -t: encode and decode string 'Aladdin:open sesame'"""
            % sys.argv[0]
        )
        sys.exit(2)
    func = encode
    for o, a in opts:
        if o == "-e":
            func = encode
        if o == "-d":
            func = decode
        if o == "-u":
            func = decode
        if o == "-t":
            test()
            return
    if args and args[0] != "-":
        with open(args[0], "rb") as f:
            func(f, sys.stdout.buffer)
    else:
        func(sys.stdin.buffer, sys.stdout.buffer)


def test():
    s0 = b"Aladdin:open sesame"
    print(repr(s0))
    s1 = encodebytes(s0)
    print(repr(s1))
    s2 = decodebytes(s1)
    print(repr(s2))
    assert s0 == s2


if __name__ == "__main__":
    main()
