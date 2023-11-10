package com.back.salcho.history.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class HistoryEntity {
    private int historyId;
    private int likes;
    private String title;
    private String review;
    private String content;

}
