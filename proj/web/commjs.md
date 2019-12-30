# String.format()

## 구문

> var newStr = String.format(formatstr, ...strings[, ..., stringN]);

#### 매개변수

`formatstr` 포맷문자열

`strings` 합칠문자열


#### 반환값

주어진 문자열을 포맷문자열에 따라 합친 새로운 문자열

## 예제

```js
String.format('{0}, {1}!','Hello','World') // 'Hello, World!'
String.format('{1}, {0}!','Hello','World') // 'World, Hello!'
```
---

# String.prototype.toEngKey()

## 구문

> str.toEngKey();

#### 반환값

현재 문자열을 영어 소문자 qwerty 배치에 맞게 치환한 문자열

## 예제

```js
'자바'.toEngKey(); // 'wkqk'
'파이썬'.toEngKey(); // 'vkdl:tjs' 시프트 문자는 앞에 `:`이 붙는다.
```