// 校园日常 - MVU 变量结构定义（Zod 4）
// 顶层 = z.object 平铺：系统状态 + 当前涉及角色 + 便签 + 行动选项 + 近期事件 + 11 名核心角色状态
// 顶层使用 z.object 以满足 defineMvuDataStore 对 z.ZodObject 类型的要求（故顶层不加 .prefault）
// z 与 _ 由 MVU 运行时默认提供，顶部禁止任何 import

export const Schema = z.object({
  // 系统状态、剧情辅助字段与近期事件（与角色同级，平铺于顶层）
  系统: z.object({
    日期: z.string().prefault('2024/09/01'),
    时间段: z.enum(['早晨', '上午', '午间', '下午', '放学后', '夜晚']).prefault('早晨'),
    当前位置: z.string().prefault('教室'),
  }).prefault({}),
  当前涉及角色: z.array(z.string()).prefault([]),
  便签: z.array(
    z.object({
      角色: z.string().prefault(''),
      内容: z.string().prefault(''),
      时间: z.string().prefault(''),
    }).prefault({})
  ).prefault([]),
  行动选项: z.array(
    z.object({
      标题: z.string().prefault(''),
      描述: z.string().prefault(''),
    }).prefault({})
  ).prefault([]),
  近期事件: z.array(z.string()).prefault([]),
  // 11 名核心角色：各自作为顶层 key，同构状态（好感度/欲望值/亲密度/信任度/关系阶段/攻略状态）
  董壹萌: z.object({
    好感度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    欲望值: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    亲密度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    信任度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    关系阶段: z.enum(['初识', '熟悉', '暧昧', '亲密']).prefault('初识'),
    攻略状态: z.enum(['未攻略', '攻略中', '已攻略']).prefault('未攻略'),
  }).prefault({}),
  黑塔: z.object({
    好感度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    欲望值: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    亲密度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    信任度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    关系阶段: z.enum(['初识', '熟悉', '暧昧', '亲密']).prefault('初识'),
    攻略状态: z.enum(['未攻略', '攻略中', '已攻略']).prefault('未攻略'),
  }).prefault({}),
  薇薇安: z.object({
    好感度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    欲望值: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    亲密度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    信任度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    关系阶段: z.enum(['初识', '熟悉', '暧昧', '亲密']).prefault('初识'),
    攻略状态: z.enum(['未攻略', '攻略中', '已攻略']).prefault('未攻略'),
  }).prefault({}),
  路曼曼: z.object({
    好感度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    欲望值: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    亲密度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    信任度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    关系阶段: z.enum(['初识', '熟悉', '暧昧', '亲密']).prefault('初识'),
    攻略状态: z.enum(['未攻略', '攻略中', '已攻略']).prefault('未攻略'),
  }).prefault({}),
  苏颜: z.object({
    好感度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    欲望值: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    亲密度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    信任度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    关系阶段: z.enum(['初识', '熟悉', '暧昧', '亲密']).prefault('初识'),
    攻略状态: z.enum(['未攻略', '攻略中', '已攻略']).prefault('未攻略'),
  }).prefault({}),
  倩倩: z.object({
    好感度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    欲望值: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    亲密度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    信任度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    关系阶段: z.enum(['初识', '熟悉', '暧昧', '亲密']).prefault('初识'),
    攻略状态: z.enum(['未攻略', '攻略中', '已攻略']).prefault('未攻略'),
  }).prefault({}),
  若若: z.object({
    好感度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    欲望值: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    亲密度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    信任度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    关系阶段: z.enum(['初识', '熟悉', '暧昧', '亲密']).prefault('初识'),
    攻略状态: z.enum(['未攻略', '攻略中', '已攻略']).prefault('未攻略'),
  }).prefault({}),
  露西: z.object({
    好感度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    欲望值: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    亲密度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    信任度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    关系阶段: z.enum(['初识', '熟悉', '暧昧', '亲密']).prefault('初识'),
    攻略状态: z.enum(['未攻略', '攻略中', '已攻略']).prefault('未攻略'),
  }).prefault({}),
  雅雪: z.object({
    好感度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    欲望值: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    亲密度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    信任度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    关系阶段: z.enum(['初识', '熟悉', '暧昧', '亲密']).prefault('初识'),
    攻略状态: z.enum(['未攻略', '攻略中', '已攻略']).prefault('未攻略'),
  }).prefault({}),
  花火: z.object({
    好感度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    欲望值: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    亲密度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    信任度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    关系阶段: z.enum(['初识', '熟悉', '暧昧', '亲密']).prefault('初识'),
    攻略状态: z.enum(['未攻略', '攻略中', '已攻略']).prefault('未攻略'),
  }).prefault({}),
  美游: z.object({
    好感度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    欲望值: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    亲密度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    信任度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    关系阶段: z.enum(['初识', '熟悉', '暧昧', '亲密']).prefault('初识'),
    攻略状态: z.enum(['未攻略', '攻略中', '已攻略']).prefault('未攻略'),
  }).prefault({}),
});

export type Schema = z.output<typeof Schema>;
