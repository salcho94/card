package com.back.salcho.wishlist.entity;

import com.back.salcho.util.PageDto;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Getter
@Setter

public class WishListEntity  extends PageDto {
    private int memberId;
    private int wishItemId;
    private int wishSort;
    private MultipartFile imgFile;
    private String wishItemImgPath;
    private String wishSiteLink;
    private String wishItemPrice;
    private String wishItemTitle;
    private String wishItemCate;
    private String wishDone;
    private String wishYn;
    private String delYn;
    private String buyYn;
    private String wishReason;
    private String cateId;
    private String cateName;
    private Date regDate;

    @Override
    public String toString() {
        return "WishListEntity{" +
                "memberId=" + memberId +
                ", wishItemId=" + wishItemId +
                ", imgFile=" + imgFile +
                ", wishItemImgPath='" + wishItemImgPath + '\'' +
                ", wishSiteLink='" + wishSiteLink + '\'' +
                ", wishItemPrice='" + wishItemPrice + '\'' +
                ", wishItemTitle='" + wishItemTitle + '\'' +
                ", wishItemCate='" + wishItemCate + '\'' +
                ", wishDone='" + wishDone + '\'' +
                ", wishYn='" + wishYn + '\'' +
                ", delYn='" + delYn + '\'' +
                ", wishReason='" + wishReason + '\'' +
                ", cateId='" + cateId + '\'' +
                ", cateName='" + cateName + '\'' +
                ", regDate=" + regDate +
                '}';
    }
}
