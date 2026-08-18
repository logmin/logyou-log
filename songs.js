/* log you 楽曲マスタ（公式サイトより取得）
   出典: https://logyou.asobisystem.com/discography/ 各リリースの詳細ページ
   用途: セットリスト入力のサジェスト候補、および曲別集計の母数。
   注意: 公式は「収録曲一覧」を掲載していないため、シングル表題曲と
         詳細ページ本文の「Coupling with」記載から抽出している。
         ライブ限定曲・未音源化曲は含まれない（入力すれば候補に自動学習される）。
*/
window.LOGYOU_SONGS_UPDATED = "2026-08-17";
window.LOGYOU_SONGS = [
  { title:"Beyond the Dream",      release:"2025-11-14", kind:"single" },
  { title:"あんぐりーガール",        release:"2025-12-05", kind:"single" },
  { title:"ろぐいん・ろぐゆー！",     release:"2025-12-26", kind:"single" },
  { title:"変更線",                release:"2026-01-06", kind:"single" },
  { title:"初恋モーメント",          release:"2026-02-20", kind:"single" },
  { title:"恋のススメ",             release:"2026-02-20", kind:"coupling" },
  { title:"桜色オーバーレイ",        release:"2026-04-05", kind:"single" },
  { title:"LET’S GO TO THE TOP",   release:"2026-04-05", kind:"coupling" },
  { title:"青春のベールをまとって",   release:"2026-06-11", kind:"single" },
  { title:"ナツコイ",               release:"2026-06-26", kind:"single" },
  { title:"推しサマDAYS",           release:"2026-07-20", kind:"single" }
];
