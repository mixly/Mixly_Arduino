import KPU as kpu
import gc, image, time
import board

try:

    kpu.deinit(task_fe)
    kpu.deinit(task_ld)
    kpu.deinit(task_fd)
    del task_fe
    del task_ld
    del task_fd

except Exception:
    pass

gc.collect()

record_ftr = []
record_ftrs = []
img_face = image.Image(size=(128, 128))
a = img_face.pix_to_ai()
dst_point = [(44, 59), (84, 59), (64, 82), (47, 105), (81, 105)]

start_processing = False
tim2 = time.ticks_ms()

task_fd = None
task_ld = None
task_fe = None
info = None
bb = 1


def set_key_state(*_):
    global start_processing
    global tim2
    if (time.ticks_ms() - tim2) > 4000:
        start_processing = True
        tim2 = time.ticks_ms()


def init(FD, LD, FE):
    global task_fd
    global task_ld
    global task_fe
    # task_fd = kpu.load(0x200000)
    # task_ld = kpu.load(0x300000)
    # task_fe = kpu.load(0x400000)

    task_fd = kpu.load(FD)
    task_ld = kpu.load(LD)
    task_fe = kpu.load(FE)

    gc.collect()
    key_gpio = board.pin(9, board.GPIO.IN, board.GPIO.PULL_UP)
    key_gpio.irq(set_key_state, board.GPIO.IRQ_RISING, board.GPIO.WAKEUP_NOT_SUPPORT)

    anchor = (
        1.889,
        2.5245,
        2.9465,
        3.94056,
        3.99987,
        5.3658,
        5.155437,
        6.92275,
        6.718375,
        9.01025,
    )  # anchor for face detect
    kpu.init_yolo2(task_fd, 0.5, 0.3, 5, anchor)


def train(img, names, threshold):
    global task_fd
    global task_ld
    global task_fe
    global start_processing
    global info
    global bb

    code = kpu.run_yolo2(task_fd, img)
    if code:
        for i in code:
            face_cut = img.cut(i.x(), i.y(), i.w(), i.h())
            face_cut_128 = face_cut.resize(128, 128)
            a = face_cut_128.pix_to_ai()
            fmap = kpu.forward(task_ld, face_cut_128)
            plist = fmap[:]
            le = (i.x() + int(plist[0] * i.w() - 10), i.y() + int(plist[1] * i.h()))
            re = (i.x() + int(plist[2] * i.w()), i.y() + int(plist[3] * i.h()))
            nose = (i.x() + int(plist[4] * i.w()), i.y() + int(plist[5] * i.h()))
            lm = (i.x() + int(plist[6] * i.w()), i.y() + int(plist[7] * i.h()))
            rm = (i.x() + int(plist[8] * i.w()), i.y() + int(plist[9] * i.h()))
            lb = i.rect()
            src_point = [le, re, nose, lm, rm]
            T = image.get_affine_transform(src_point, dst_point)
            a = image.warp_affine_ai(img, img_face, T)
            a = img_face.ai_to_pix()
            del face_cut_128
            fmap = kpu.forward(task_fe, img_face)
            feature = kpu.face_encode(fmap[:])
            reg_flag = False
            scores = []
            for j in range(len(record_ftrs)):
                score = kpu.face_compare(record_ftrs[j], feature)
                scores.append(score)
            max_score = 0
            index = 0
            for k in range(len(scores)):
                if max_score < scores[k]:
                    max_score = scores[k]
                    index = k
            if start_processing:
                record_ftr = feature
                record_ftrs.append(record_ftr)
                start_processing = False
            if max_score > threshold:
                info = [names[index], max_score, lb, src_point]
            else:
                if bb == 1:
                    print("Please press BOOT key to enter the face")
                    bb = 0
                info = [None, max_score, lb, src_point]
            return True
            break
    else:
        info = None
        bb = 1
        return False
    gc.collect()


def info_name():
    gc.collect()
    return info[0]


def info_score():
    return info[1]


def info_face():
    return info[2]


def info_organs():
    return info[3]
