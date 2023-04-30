import { z, defineCollection } from 'astro:content'

// 夢主の名前の定義
export const OCSetting = z.object({
    jpOCFamilyName: z.string().nullable(), // 夢主の名字
    jpOCFirstName: z.string().nullable(), // 夢主の名前
    enOCFirstName: z.string().nullable(),   // 夢主のファーストネーム
    enOCFamilyName: z.string().nullable(),  // 夢主のファミリーネーム
});

// スキーマから夢主の名前の型生成
export type OCName = z.infer<typeof OCSetting>;

// SSのフロントマター定義
const ssCollection = defineCollection({
    schema: z.object({
        title: z.string(),  // 作品タイトル
        date: z.date(), // 公開日
        genre: z.string(), // ジャンル
        character: z.string().nullable(), // 相手キャラ
        isR18: z.boolean(), // R18かどうか true:R18 false:全年齢
        description: z.string().nullable(), // 作品コメント
        OCSetting, // 夢主の名前
    })
});


// SSじゃないやつのフロントマター定義
const postCollection = defineCollection({
    schema: z.object({
        title: z.string(),  // タイトル
        date: z.date(), // 公開日
        genre: z.string(),  // ジャンル
        description: z.string().nullable(), // コメント
    })
});

// 定義のエクスポート
export const collections = {
    'notes': postCollection,
    'ss': ssCollection,
};