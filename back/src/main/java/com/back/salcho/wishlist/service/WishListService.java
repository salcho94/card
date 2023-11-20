package com.back.salcho.wishlist.service;


import com.back.salcho.wishlist.entity.WishListEntity;
import com.back.salcho.wishlist.mapper.WishListMapper;

import java.util.List;
import java.util.Map;

public interface WishListService {
    public List<Map<String,String>> getWishCode();

    public int insertWishItem(WishListEntity wishListEntity);

    public List<Map<String,Object>> getWishList(WishListEntity wishListEntity);

    public Map<String,Object> getWishItem(String wishItemId);

    public int deleteWishItem(String wishItemId);

    public int wishDoneItem(String wishItemId);
}
