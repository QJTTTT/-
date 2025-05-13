package com.spboot.tx.filter;
import java.util.*;

public class CollaborativeFiltering {

    // 用户行为数据类
    static public class UserProductData {
        public int userId;
        public int productId;
        public int pinglun;
        public int dianzan;
        public int shoucang;
        public int liulancishu;

        public UserProductData()
        {

        }

        public UserProductData(int userId, int productId, int pinglun, int dianzan, int shoucang, int liulancishu) {
            this.userId = userId;
            this.productId = productId;
            this.pinglun = pinglun;
            this.dianzan = dianzan;
            this.shoucang = shoucang;
            this.liulancishu = liulancishu;
        }
    }

    // 计算评分
    public static double calculateRating(UserProductData data) {
        // 点赞：1分，评论：pinglun（1-5分），收藏：1分，浏览次数：liulancishu * 0.1
        return data.dianzan + data.pinglun + data.shoucang + data.liulancishu * 0.1;
    }

    // 构建用户-商品评分矩阵
    public static Map<Integer, Map<Integer, Double>> buildUserItemMatrix(List<UserProductData> dataList) {
        Map<Integer, Map<Integer, Double>> userItemMatrix = new HashMap<>();

        for (UserProductData data : dataList) {
            double rating = calculateRating(data);
            userItemMatrix
                    .computeIfAbsent(data.userId, k -> new HashMap<>())
                    .put(data.productId, rating);
        }

        return userItemMatrix;
    }

    // 计算两个用户之间的余弦相似度
    public static double cosineSimilarity(Map<Integer, Double> user1Ratings, Map<Integer, Double> user2Ratings) {
        double dotProduct = 0.0;
        double magnitude1 = 0.0;
        double magnitude2 = 0.0;

        if(user1Ratings == null)return 0;

        // 遍历用户1和用户2的评分
        for (Map.Entry<Integer, Double> entry : user1Ratings.entrySet()) {
            Integer productId = entry.getKey();
            if (user2Ratings.containsKey(productId)) {
                dotProduct += entry.getValue() * user2Ratings.get(productId);
            }
            magnitude1 += Math.pow(entry.getValue(), 2);
        }

        for (double rating : user2Ratings.values()) {
            magnitude2 += Math.pow(rating, 2);
        }

        if (magnitude1 == 0 || magnitude2 == 0) {
            return 0.0;
        }

        return dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
    }

    // 基于用户的协同过滤算法推荐商品
    public static List<Integer> recommendItems(Map<Integer, Map<Integer, Double>> userItemMatrix, int targetUserId, int K) {
        List<Integer> recommendedItems = new ArrayList<>();
        Map<Integer, Double> targetUserRatings = userItemMatrix.get(targetUserId);
        if(targetUserRatings == null){
            return new ArrayList();
        }
        // 存储相似度和用户ID
        List<SimilarityScore> similarityScores = new ArrayList<>();

        // 计算目标用户与其他用户的相似度
        for (Map.Entry<Integer, Map<Integer, Double>> entry : userItemMatrix.entrySet()) {
            int userId = entry.getKey();
            if (userId != targetUserId) {
                double similarity = cosineSimilarity(targetUserRatings, entry.getValue());
                similarityScores.add(new SimilarityScore(userId, similarity));

                // 直接在推荐时输出相似度
                System.out.println("目标用户 " + targetUserId + " 与 用户 " + userId + " 的相似度: " + similarity);
            }
        }

        // 按相似度排序
        similarityScores.sort((a, b) -> Double.compare(b.similarity, a.similarity));

        // 选择最相似的K个用户
        Set<Integer> recommendedItemsSet = new HashSet<>();
        for (int i = 0; i < K && i < similarityScores.size(); i++) {
            int similarUserId = similarityScores.get(i).userId;
            Map<Integer, Double> similarUserRatings = userItemMatrix.get(similarUserId);

            // 根据相似用户的评分来推荐商品
            for (Map.Entry<Integer, Double> entry : similarUserRatings.entrySet()) {
                int productId = entry.getKey();
                if (!targetUserRatings.containsKey(productId)) { // 目标用户没有评分过此商品
                    recommendedItemsSet.add(productId);
                }
            }
        }

        recommendedItems.addAll(recommendedItemsSet);
        return recommendedItems;
    }

    // 相似度评分的辅助类
    static class SimilarityScore {
        int userId;
        double similarity;

        public SimilarityScore(int userId, double similarity) {
            this.userId = userId;
            this.similarity = similarity;
        }
    }

    // 打印评分矩阵
    public static void printMatrix(Map<Integer, Map<Integer, Double>> userItemMatrix) {
        System.out.println("用户-商品评分矩阵：");
        for (Map.Entry<Integer, Map<Integer, Double>> userEntry : userItemMatrix.entrySet()) {
            System.out.print("用户" + userEntry.getKey() + ": ");
            for (Map.Entry<Integer, Double> productEntry : userEntry.getValue().entrySet()) {
                System.out.print("商品" + productEntry.getKey() + "=" + productEntry.getValue() + " ");
            }
            System.out.println();
        }
    }

    // 输出推荐商品
    public static void printRecommendations(List<Integer> recommendedItems) {
        if (recommendedItems.isEmpty()) {
            System.out.println("没有推荐商品");
        } else {
            System.out.println("推荐的商品ID：" + recommendedItems);
        }
    }

    // 主程序，用于测试协同过滤推荐
    public static void main(String[] args) {
        // 提供的用户行为数据
        List<UserProductData> dataList = Arrays.asList(
                new UserProductData(1, 2, 0, 1, 0, 10),
                new UserProductData(2, 2, 0, 0, 1, 5),
                new UserProductData(1, 3, 0, 1, 1, 8),
                new UserProductData(3, 2, 0, 0, 1, 12),
                new UserProductData(3, 4, 0, 0, 1, 5),
                new UserProductData(4, 1, 2, 1, 0, 10)
        );

        // 构建用户-商品评分矩阵
        Map<Integer, Map<Integer, Double>> userItemMatrix = buildUserItemMatrix(dataList);

        // 打印评分矩阵，查看每个用户对商品的评分
        printMatrix(userItemMatrix);

        // 为用户1推荐商品
        List<Integer> recommendedItems = recommendItems(userItemMatrix, 1, 2);

        // 输出推荐商品
        printRecommendations(recommendedItems);
    }
}
