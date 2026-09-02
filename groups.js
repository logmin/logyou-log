/* グループ登録簿（参戦ログ）
   1つのアプリで複数グループを切り替えるための定義。ここに1件足して
   groups/<id>/{schedule,songs,members}.js を置き、index.html と sw.js に
   <script>/ASSETS を追記すればグループが増える。

   id        : localStorage キーと ?g= に使う識別子。**一度決めたら変えない**
               （記録が `live-log-v1:<id>` に紐づくため）
   ns        : データファイル側の window グローバルの接頭辞
               （例 LOGYOU → window.LOGYOU_SCHEDULE / _SONGS / _MEMBERS）
   accent    : そのグループのテーマ色 [ライト, ダーク]。今どっちを見ているか
               一目で分かるようにヘッダー・ボタン・カレンダーへ反映される
   legacyKey : 統合前の単体アプリが使っていた localStorage キー。
               新キーが空のときだけここから読む（移行のため。消さない）
   site      : 公式サイト。スケジュールの出典表示に使う
*/
window.LIVE_LOG_GROUPS = [
  {
    id:'logyou',
    name:'log you',
    emoji:'🎤',
    ns:'LOGYOU',
    accent:['#3f6fe0','#6b91f0'],
    legacyKey:'logyou-log-v1',
    site:'https://logyou.asobisystem.com/'
  },
  {
    id:'toitoitoi',
    name:'Toi Toi Toi',
    emoji:'🍀',
    ns:'TOITOITOI',
    accent:['#d1418a','#f284b8'],
    legacyKey:'toitoitoi-log-v1',
    site:'https://toitoitoi.asobisystem.com/'
  }
];
