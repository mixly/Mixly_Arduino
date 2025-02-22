"""
Matrix8x5 Displays

Micropython library for the TM1652 Matrix8x5 Displays
=======================================================

#Preliminary compositio						20230411

dahanzimin From the Mixly Team
"""
from tm1652 import TM1652

class Matrix(TM1652):
	"""A single matrix."""
	def __init__(self, pin, brightness=0.3, font="4x5", width=8, height=5):
		super().__init__(pin, brightness, width, height)
		self.font(font)

	"""Graph module 5x8"""
	HEART = b'\x14>>\x1c\x08'
	HEART_SMALL = b'\x00\x14\x1c\x08\x00'
	HAPPY = b'\x00\x14\x00"\x1c'
	SAD = b'\x00\x14\x00\x1c"'
	SMILE = b'\x00\x14\x00"\x1c'
	SILLY = b'"\x00>(8'
	FABULOUS = b'>6\x00\x14\x1c'
	SURPRISED = b'\x14\x00\x08\x14\x08'
	ASLEEP = b'\x006\x00\x1c\x00'
	ANGRY = b'"\x14\x00>*'
	CONFUSED = b'\x00\x14\x00\x14*'
	NO = b'"\x14\x08\x14"'
	YES = b'\x00 \x10\n\x04'
	LEFT_ARROW = b'\x08\x04~\x04\x08'
	RIGHT_ARROW = b'\x10 ~ \x10'
	DRESS = b'$f<Z\xbd'
	TRANSFORMERS = b'\x08\x1c*\x14"'
	SCISSORS = b'&\x16\x08\x16&'
	EXIT = b'\x08\x1c*\x16 '
	TREE = b'\x08\x1c>\x08\x08'
	PACMAN = b'<\x16\x0e\x1e<'
	TARGET = b'\x08\x1c6\x1c\x08'
	TSHIRT = b'6>\x1c\x1c\x1c'
	ROLLERSKATE = b'00>>\x14'
	DUCK = b'\x0c\x0e<\x1c\x00'
	HOUSE = b'\x08\x1c>\x1c\x14'
	TORTOISE = b'\x00\x1c>\x14\x00'
	BUTTERFLY = b'6>\x08>6'
	STICKFIGURE = b'\x08>\x08\x14"'
	GHOST = b'>*>>*'
	PITCHFORK = b'**>\x08\x08'
	MUSIC_QUAVERS = b'<$$66'
	MUSIC_QUAVER = b'\x08\x18(\x0e\x0e'
	MUSIC_CROTCHET = b'\x08\x08\x08\x0e\x0e'	
	COW = b'"">\x1c\x08'
	RABBIT = b'\n\n\x1e\x16\x1e'
	SQUARE_SMALL = b'\x00\x1c\x14\x1c\x00'
	SQUARE = b'>""">'
	DIAMOND_SMALL = b'\x00\x08\x14\x08\x00'
	DIAMOND = b'\x08\x14"\x14\x08'
	CHESSBOARD = b'\x14*\x14*\x14'
	TRIANGLE_LEFT = b'\x02\x06\n\x12>'								
	TRIANGLE = b'\x00\x08\x14>\x00'
	SNAKE = b'\x066\x14\x1c\x00'
	UMBRELLA = b'\x1c>\x08\n\x0c'
	SKULL = b'\x1c*>\x1c\x1c'
	GIRAFFE = b'\x06\x04\x04\x1c\x14'
	SWORD = b'\x08\x08\x08\x1c\x08'
