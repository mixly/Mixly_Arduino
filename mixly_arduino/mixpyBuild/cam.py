import cv2

def photo_capture(out_file, end_button):
    cap = cv2.VideoCapture(0)
    while(1):
        ret, frame = cap.read()
        cv2.imshow("capture", frame)
        if cv2.waitKey(1) & 0xFF == ord(end_button):
            cv2.imwrite(out_file, frame)
            break
    cap.release()
    cv2.destroyAllWindows()

