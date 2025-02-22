export const cv_read_image = function (_, generator) {
    generator.definitions_['import_cv2'] = 'import cv2';
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var code = "cv2.imread(" + file + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const cv_show_image = function (_, generator) {
    generator.definitions_['import_cv2'] = 'import cv2';
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var code = "cv2.imshow(" + data + ',' + file + ")\n";
    return code;
}

export const cv_write_image = function (_, generator) {
    generator.definitions_['import_cv2'] = 'import cv2';
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var code = "cv2.imwrite(" + data + ',' + file + ")\n";
    return code;
}

export const cv_waitkey = function (_, generator) {
    generator.definitions_['import_cv2'] = 'import cv2';
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var code = "cv2.waitKey(" + data + ")\n";
    return code;
}

export const cv_destroy_all = function (_, generator) {
    generator.definitions_['import_cv2'] = 'import cv2';
    var code = "cv2.destroyAllWindows()\n";
    return code;
}

export const cv_line_rect = function (_, generator) {
    generator.definitions_['import_cv2'] = 'import cv2';
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var x1 = generator.valueToCode(this, 'x1', generator.ORDER_ATOMIC);
    var y1 = generator.valueToCode(this, 'y1', generator.ORDER_ATOMIC);
    var x2 = generator.valueToCode(this, 'x2', generator.ORDER_ATOMIC);
    var y2 = generator.valueToCode(this, 'y2', generator.ORDER_ATOMIC);
    var thick = generator.valueToCode(this, 'thick', generator.ORDER_ATOMIC);
    var color = this.getFieldValue('FIELDNAME');
    var color1 = eval('0x' + color[1] + color[2])
    var color2 = eval('0x' + color[3] + color[4])
    var color3 = eval('0x' + color[5] + color[6])
    var direction = this.getFieldValue('DIR');
    var code = "cv2." + direction + "(" + file + ',(' + x1 + ',' + y1 + '),(' + x2 + ',' + y2 + '),(' + color3 + ',' + color2 + ',' + color1 + '),' + thick + ")\n";
    return code;
}

export const cv_text = function (_, generator) {
    generator.definitions_['import_cv2'] = 'import cv2';
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var x1 = generator.valueToCode(this, 'x1', generator.ORDER_ATOMIC);
    var y1 = generator.valueToCode(this, 'y1', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var size = generator.valueToCode(this, 'size', generator.ORDER_ATOMIC);
    var thick = generator.valueToCode(this, 'thick', generator.ORDER_ATOMIC);
    var color = this.getFieldValue('FIELDNAME');
    var color1 = eval('0x' + color[1] + color[2])
    var color2 = eval('0x' + color[3] + color[4])
    var color3 = eval('0x' + color[5] + color[6])
    var font = this.getFieldValue('font');
    var code = "cv2.putText(" + file + ',' + data + ',(' + x1 + ',' + y1 + '),cv2.FONT_HERSHEY_' + font + ',' + size + ',(' + color3 + ',' + color2 + ',' + color1 + '),' + thick + ")\n";
    return code;
}

export const cv_face_classifier = function (_, generator) {
    generator.definitions_['import_cv2'] = 'import cv2';
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var code = "cv2.CascadeClassifier(" + file + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const cv_face_detect = function (_, generator) {
    generator.definitions_['import_cv2'] = 'import cv2';
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var face = generator.valueToCode(this, 'FACE', generator.ORDER_ATOMIC);
    var scale = generator.valueToCode(this, 'SCALE', generator.ORDER_ATOMIC);
    var neighbor = generator.valueToCode(this, 'NEIGHBOR', generator.ORDER_ATOMIC);
    var code = face + ".detectMultiScale(" + file + ',scaleFactor=' + scale + ',minNeighbors=' + neighbor + ")";
    return [code, generator.ORDER_ATOMIC];
}

export const cv_face_detect_all = function (_, generator) {
    generator.definitions_['import_cv2'] = 'import cv2';
    var file = generator.valueToCode(this, 'FILE', generator.ORDER_ATOMIC);
    var face = generator.valueToCode(this, 'FACE', generator.ORDER_ATOMIC);
    var scale = generator.valueToCode(this, 'SCALE', generator.ORDER_ATOMIC);
    var neighbor = generator.valueToCode(this, 'NEIGHBOR', generator.ORDER_ATOMIC);
    var x1 = generator.valueToCode(this, 'x1', generator.ORDER_ATOMIC);
    var y1 = generator.valueToCode(this, 'y1', generator.ORDER_ATOMIC);
    var x2 = generator.valueToCode(this, 'x2', generator.ORDER_ATOMIC);
    var y2 = generator.valueToCode(this, 'y2', generator.ORDER_ATOMIC);
    var code = face + ".detectMultiScale(" + file + ',scaleFactor=' + scale + ',minNeighbors=' + neighbor + ',minSize=(' + x1 + ',' + y1 + '),maxSize=(' + x2 + ',' + y2 + "))";
    return [code, generator.ORDER_ATOMIC];
}