function mergeMeeting(roomTimes: [number, number][]) {
    // 对会议时间进行排序，按照会议的开始时间从小到大排序
    roomTimes.sort((a, b) => a[0] - b[0])

    // 初始化合并后的时间数组，起始值为排序后的第一个会议时间段
    const merged = [roomTimes[0]]

    for (let i = 1; i < roomTimes.length; i++) {
        const currentMeeting = merged[merged.length - 1]
        const [_, currentMeetingEnd] = currentMeeting
        const nextMeeting = roomTimes[i]
        const [nextMeetingStart, nextMeetingEnd] = nextMeeting
        if (currentMeetingEnd >= nextMeetingStart) {
            currentMeeting[1] = Math.max(currentMeeting[1], nextMeetingEnd)
        } else {
            merged.push(nextMeeting)
        }

    }

    return merged
}