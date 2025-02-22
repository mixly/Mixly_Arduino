try:
    import image

    image.font_free()
except:
    pass

try:
    import lcd, time, gc, machine

    lcd.init(color=0x0000)
    lcd.draw_string(48, 100, "Welcome to MixGo!", lcd.YELLOW, lcd.BLACK)
    lcd.draw_string(62, 132, "loading .", lcd.YELLOW, lcd.BLACK)
    time.sleep_ms(50)
    lcd.draw_string(62, 132, "loading ..", lcd.YELLOW, lcd.BLACK)
    time.sleep_ms(50)
    lcd.draw_string(62, 132, "loading ...", lcd.YELLOW, lcd.BLACK)
    time.sleep_ms(50)
    lcd.draw_string(62, 132, "loading ....", lcd.YELLOW, lcd.BLACK)
    time.sleep_ms(50)
    lcd.draw_string(62, 132, "loading .....", lcd.YELLOW, lcd.BLACK)
    time.sleep_ms(50)
    lcd.draw_string(62, 132, "loading ......", lcd.YELLOW, lcd.BLACK)
    time.sleep_ms(50)
    lcd.draw_string(62, 132, "loading .......", lcd.YELLOW, lcd.BLACK)
    time.sleep_ms(50)
    lcd.clear(0x0000)
    del time
    del lcd
    del gc

finally:
    import gc

    gc.collect()
