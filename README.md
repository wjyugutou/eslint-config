# @yugutou/eslint-config

## 在大佬 [@antfu/eslint-config](https://npmjs.com/package/@antfu/eslint-config) 的基础上加点自己喜好的配置

## Usage

### Install

```bash
pnpm add -D eslint @yugutou/eslint-config
```

### Config `.eslintrc`

```json
{
  "extends": "@yugutou"
}
```

### publish newversion

-F || --force 跳过版本检查 用于 actions 失败后重新发布该版本

```
pnpm release x.x.x --desc='xxxxx'
pnpm release -v='x.x.x' --desc='xxxxx'
```
