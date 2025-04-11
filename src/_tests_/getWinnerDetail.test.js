import { CHOICES, WINNER_DETAIL, VICTORY_STATUS } from '../Constants'
import { describe, expect, test } from 'vitest'
import { getWinnerDetail } from '../helpers/getWinnerDetail'

describe('getWinnerDetail', () => {
  const rock = CHOICES[0]
  const paper = CHOICES[1]
  const scissors = CHOICES[2]

  test('returns Tie when both selections are the same', () => {
    const [winner, text] = getWinnerDetail({
      userSelectInfo: rock,
      compSelectInfo: rock,
    })
    expect(winner).toBe(WINNER_DETAIL.Tie)
    expect(VICTORY_STATUS.Tie).toContain(text)
  })

  test('returns User win when user beats computer', () => {
    const [winner, text] = getWinnerDetail({
      userSelectInfo: rock,
      compSelectInfo: scissors,
    })
    expect(winner).toBe(WINNER_DETAIL.User)
    expect(VICTORY_STATUS.User).toContain(text)
  })

  test('returns Computer win when computer beats user', () => {
    const [winner, text] = getWinnerDetail({
      userSelectInfo: paper,
      compSelectInfo: scissors,
    })
    expect(winner).toBe(WINNER_DETAIL.Computer)
    expect(VICTORY_STATUS.Computer).toContain(text)
  })
})
