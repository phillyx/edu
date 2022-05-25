/**
 * 关联子串
 * 给定两个字符串str1和str2，如果字符串str1中的字符，经过排列组合后的字符串中，只要有一个字符串是str2的子串，则认为str1是str2的关联子串。
若str1是str2的关联子串，请返回子串在str2的起始位置；
若不是关联子串，则返回-1。
示例1：
输入：str1="abc",str2="efghicabiii"
输出：5
解释：str2包含str1的一种排列组合（"cab")，此组合在str2的字符串起始位置为5（从0开始计数）
示例2：str1="abc",str2="efghicaibii"
输出：-1。
预制条件：

输入的字符串只包含小写字母；

两个字符串的长度范围[1, 100,000]之间

若str2中有多个str1的组合子串，请返回第一个子串的起始位置。
 */

function getLinkedSubstringFirstIndex(str: string, substr: string) {
  if (substr.length >= str.length) return -1
  const len1 = str.length
  const len2 = substr.length
  const map = {} as {[key: string]: {count: number; usedCount: number}}

  const isAllMatched = () =>
    Object.values(map).every((x) => x.count === x.usedCount)
  const resetMap = () => {
    Object.values(map).forEach((x) => (x.usedCount = 0))
  }
  for (let i = 0; i < len2; i++) {
    const ch = substr.charAt(i)
    if (!map[ch]) {
      map[ch] = {count: 1, usedCount: 0}
    } else {
      map[ch].count += 1
    }
  }

  for (let i = 0; i < len1 - len2; i++) {
    let bool = false
    for (let j = i; j < i + len2; j++) {
      const chr = str[j]
      if (!map[chr]) {
        bool = true
        break
      } else {
        map[chr].usedCount += 1
      }
    }

    if (bool) {
      resetMap()
      continue
    }

    if (isAllMatched()) {
      return i
    }
  }

  return -1
}

// https://www.typescriptlang.org/play?#code/PQKhCgAIUxnRUFQDAK2oJjko0Jt+gs7UCRygqOUOragZN7IDOALgE4CMgMSrkUBMgMP+BBmoDnmRplVgtHKAhbkSaB5v0Dj8YCTjQOhKgEb9AECqA4FQHEeTQFfKgQMjAkOaAAOQLFA9Gb0GfFE0CYSoBLowFxy9KgcpGEKQEAM4QKdBNu4z6PkTQO-RgCvxgHtqKIAU6oZ8gO6xgNOagLLygHb+gNj-boCwcno+ZsEAtFQugFyegNHyVIBY-+CAyfGAporFNgC8AEQAhgBGAMZ1ADSG9QCmAGYA5gAWAJYtzcMTdeWAX4rFAKzggMeRgFOJ1faAoMqA1Co2fFqAs56SsoAQ-3VjTXUAlEyAJtay4faKyDEJlnNHgHNyAAyAAPrRgIXRgAdTQCQ-+BCgw1tR6s02p17D0BiMxsMmpMZsUci5ACEZgDYlQCG5oA3uVK5QqjxUW0A8DqATMV8IBZ62S4DwnD4gH9UwBleoBgYMAL2oAbSo7UgVE+n3aQs+AF1ANJygBfU8BuQw8DSALE1cDtZCZAkFADTeOhQUTi8Rc0GAst6AFcAHYtMjDAD25sg-W6ZAAMsNzQBrboAEwAyqamvQ3f0AGLDCjkACS5q93QAHgAKegALkggfN-X5JH9ydTlCDF0gAG8oJBhr1IIns5QAHQAG266bIg0gAD4armKHWG-0mwWKE7TRR7TkSy07eRIPXzVRIO36F3G4NR+OyJOGwxZ6mq52pz2l5BIGPzROALYNAAOm8LAF9IA0SEXuZ6AJ4ptP9MUpwtji1kFPm00TyaboKAAbkgU0SG9ABhG1f3-QDgIoa9r1lA8jwnYYSAAQVrWsAFkGjIFpBm9Td4wLGoWxLA8AHkmgAK26K1qwANwaWtTW6Eh4zPc8LmrbpWJA5943jWNKJbSBY2rH9zVXGpFOk6tIJguD5IuZdj1XfsoLIQjL3bCjZyk4sDzoxjmLINiOK4ni+IE3obQoABRBoSLEiSTIrGTVK9WDf03T4Lk0g9UIPJyKAretV2GILwLigAeNdzQYBKAGp0oLMzzIw1cSM3LMAxrEiGgobCyHjYZQvMssKwAQj47kSLFbKaPMpqWqvOS-wFfk-IC+SU0+cLzNvbpaygot2oPTrBjFWT1NXdL2yodrRtQktIuip1S3ivbkqnGcshStLS0ytrzLXVcmhtG1a03XoOKg9rtvjGLIAYzdhnAr7kri9LTt+i7pqu9CV0PQYornShuQYsUZtLct40ai9mqh1rQbBg9bvuzdKC4xGcf7Bp3UR8bJu6LHsbmigFoGpbIBWgVyfWtDauR3Ha0usHdKdAyKMRo9rQA7o2fauqqpwvDCOI0ivQonmrv7MhB3tYY2bC9mVbVyAR02j7akaVoOi6Oo+iGUYGmRVEMPu7o6xtfp40dF03U9X1tyDUNwzIKMYwTQxYWoELwCN6FTbhc2EStlFbfHe3Hed13XQ9b0-WKihvbDSNozjRN7GDqhQ-AIA