package com.back.salcho.board.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class BoardEntity {
    private int boardId;
    private String boardType;
    private String title;
    private String contents;
    private String userId;
    private String regDate;
    private String uptDate;
    private int likes;
    private int counts;
}
