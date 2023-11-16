package com.back.salcho.util;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileEntity {

    private String fileName;
    private String contentType;

    public FileEntity(String fileName, String contentType) {
        this.fileName = fileName;
        this.contentType = contentType;
        System.out.println(contentType);
    }
}
