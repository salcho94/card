package com.back.salcho.wishlist.mapper;

import com.back.salcho.wishlist.entity.WishListEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface WishListMapper {
    public List<Map<String,String>> getWishCode();

    public int insertWishItem(WishListEntity wishListEntity);

    public List<Map<String,Object>> getWishList(WishListEntity wishListEntity);

    public  Map<String,Object> getWishItem(String wishItemId);

    public int deleteWishItem(String wishItemId);

    public int wishDoneItem(String wishItemId);

    public int getTotalCount(WishListEntity wishListEntity);
}
