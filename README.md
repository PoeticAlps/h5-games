# H5 游戏厅

纯前端单文件 HTML 小游戏合集。无需构建、无依赖、无需安装，双击 `index.html` 即可在浏览器中打开游戏大厅。

## 游戏清单（7 款）

游戏位于 `Win Trae Demo/` 目录，均为自包含单文件 HTML：

| 游戏 | 文件 | 玩法 | 操作 |
|------|------|------|------|
| 经典贪吃蛇 | `贪吃蛇snake.html` | 吃食物变长，撞墙或撞到自己即结束 | 方向键转向，点击「开始游戏」 |
| 跳一跳 | `jump_game.html` | 按住蓄力、松开起跳，跳上下一个方块，越准分越高 | 鼠标/触屏按住蓄力，松开起跳 |
| 消除类游戏 - 经典三消 | `开心消消乐.html` | 交换相邻方块凑三连消除，限定步数内达到目标分数（1000 分） | 点击两个相邻方块交换 |
| 元素合成游戏 | `crafting_game.html` | 拖动物品到合成槽点击「合成」，产出新元素，集图鉴、解锁成就 | 拖拽 + 点击 |
| 合成大师 - 七七四十九平台 | `crafting_game_v2.html` | 点击基础生成器产出原料，两个同等级物品拖到相邻平台自动合成更高级物品 | 点击生成器 + 拖拽合成 |
| Counter-Strike: Global Offensive Clone | `fps_game.html` | 3D 第一人称射击，含竞技匹配 / 死亡竞赛 / 拆弹模式，地图 Dust 2、Inferno、Mirage（界面为英文） | WASD 移动、鼠标瞄准开火、Shift 疾跑、Ctrl 蹲下、空格跳、R 换弹 |
| 三国杀 - 个人版 | `三国杀.html` | 与电脑对手回合制卡牌对决，双方各 4 点体力，用杀、闪、桃等卡牌击败对方 | 点击手牌出牌，按钮摸牌 |

## 如何本地玩

直接**双击 `index.html`** 用浏览器打开即可；大厅中的所有游戏链接都是相对路径，点卡片即玩。

如果想通过 HTTP 访问（推荐，行为与线上一致）：

```bash
# 仓库根目录下任选其一
python3 -m http.server 8080
npx serve .
```

然后访问 `http://localhost:8080`。

## 部署

纯静态站点，可直接挂 GitHub Pages / Vercel / Netlify / 任意静态服务器：

1. 把整个仓库推送到 GitHub；
2. 仓库设置 → Pages → Source 选分支（如 `main`）根目录；
3. 访问 `https://<user>.github.io/<repo>/` 即可。

无需任何构建步骤。

## 目录结构

```
.
├── index.html              # 游戏大厅（自包含单文件，无外部依赖）
├── README.md
├── Win Trae Demo/          # 7 个单文件 HTML 游戏
│   ├── 贪吃蛇snake.html
│   ├── jump_game.html
│   ├── 开心消消乐.html
│   ├── crafting_game.html
│   ├── crafting_game_v2.html
│   ├── fps_game.html       # 3D FPS，地图数据内联，无外部脚本
│   └── 三国杀.html
└── misc/                   # 非游戏页面
    ├── 合浦珠还.html        # 校园失物招领平台（Leaflet 地图）
    ├── maps.js             # 合浦珠还.html 的地图数据/初始化脚本（同目录引用）
    └── 丢宝宝.html          # 寻宠启事落地页
```

## 注意事项

- 7 个游戏全部为自包含单文件，离线可玩。
- `misc/` 下两个页面依赖外部 CDN（Leaflet via unpkg、OpenStreetMap 瓦片、生图 API 等），**离线时地图/图片不可用**，仅游戏大厅与游戏本体完全离线。
- `misc/maps.js` 只被 `misc/合浦珠还.html` 引用，二者必须放在同一目录。
