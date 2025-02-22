import board
import audio, video
from Maix import I2S
import gc

spk_b = None
spk_d = None
spk_w = None


def spk_init(BLK=8, WS=9, DAT=10, sample_rate=16000):
    global spk_b
    global spk_d
    global spk_w
    spk_b = BLK
    spk_d = DAT
    spk_w = WS
    board.register(DAT, board.FPIOA.I2S0_OUT_D1)
    board.register(BLK, board.FPIOA.I2S0_SCLK)
    board.register(WS, board.FPIOA.I2S0_WS)
    wav_dev = I2S(I2S.DEVICE_0)
    wav_dev.channel_config(
        I2S.CHANNEL_1,
        I2S.TRANSMITTER,
        resolution=I2S.RESOLUTION_16_BIT,
        cycles=I2S.SCLK_CYCLES_32,
        align_mode=I2S.STANDARD_MODE,
    )
    wav_dev.set_sample_rate(sample_rate)
    spk_rep = wav_dev
    return wav_dev


def mic_init(BLK=35, WS=33, DAT=34, sample_rate=16000):
    board.register(DAT, board.FPIOA.I2S2_IN_D0)
    board.register(BLK, board.FPIOA.I2S2_SCLK)
    board.register(WS, board.FPIOA.I2S2_WS)
    wav_dev = I2S(I2S.DEVICE_2)
    wav_dev.channel_config(
        I2S.CHANNEL_0,
        I2S.RECEIVER,
        resolution=I2S.RESOLUTION_16_BIT,
        cycles=I2S.SCLK_CYCLES_32,
        align_mode=I2S.STANDARD_MODE,
    )
    wav_dev.set_sample_rate(sample_rate)
    return wav_dev


def audio_play(I2S, path, num=80):
    try:
        player = audio.Audio(path=path)
    except Exception as e:
        raise NameError("No audio file loaded or {}".format(e))
    player.volume(num)
    wav_info = player.play_process(I2S)
    I2S.set_sample_rate(wav_info[1])
    while True:
        ret = player.play()
        if ret == None:
            print("Format Error")
            break
        elif ret == 0:
            print("Play end \n")
            player.finish()
            break
    player.__deinit__()
    gc.collect()


def audio_record(I2S, path, record_time, sample_rate=16000):
    try:
        recorder = audio.Audio(path=path, is_create=True, samplerate=sample_rate)
    except Exception as e:
        raise NameError("Need audio storage location or {}".format(e))
    queue = []
    frame_cnt = record_time * sample_rate // 2048
    for i in range(frame_cnt):
        tmp = I2S.record(2048 * 2)
        if len(queue) > 0:
            ret = recorder.record(queue[0])
            queue.pop(0)
        I2S.wait_record()
        queue.append(tmp)
        print("record:{}s".format(round(((frame_cnt - i - 1) / 7.7), 1)))
    recorder.finish()
    recorder.__deinit__()
    del recorder
    print("Audio record finish \n")
    gc.collect()


def video_play(I2S1, path, num=80):
    try:
        global spk_b
        global spk_d
        global spk_w
        import lcd

        lcd.init()
        I2S = spk_init(spk_b, spk_w, spk_d)
        vide = video.open(path)
    except Exception as e:
        raise NameError("No video file loaded or {}".format(e))
    vide.volume(num)
    while True:
        try:
            ret = vide.play()
        except Exception as e:
            raise NameError("Video format error or {}".format(e))
        if ret == None:
            print("Format Error")
            break
        elif ret == 0:
            print("Play end \n")
            break
    vide.__del__()
    del vide
    del I2S
    gc.collect()


def video_record(I2S, path, record_time):
    import sensor, lcd

    lcd.init()
    try:
        v = video.open(
            path,
            audio=False,
            record=True,
            interval=200000,
            quality=80,
            width=240,
            height=240,
        )
    except Exception as e:
        raise NameError("Need video storage location or {}".format(e))
    record_time = record_time * 5
    for i in range(record_time):
        try:
            img = sensor.snapshot()
        except:
            raise NameError("Need to initialize camera")
        lcd.display(img)
        v.record(img)
        print("record {}s".format(round((record_time - i - 1) * 0.2, 1)))
    v.record_finish()
    print("Video record finish \n")
    v.__del__()
    gc.collect()
