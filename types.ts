export type Snippet = {
    title: string
      platform: string
      type: string
      description: string
      solution: string
      complexityAnalysis: string
      code: string
}

export type SnippetRecord = Record<number, Snippet>

export type Stack = {
  [key: string]: {
    main: string
    name: string
    side: string
  }
}

export type Project = {
  title: string
  problem: string
  solution: string
  tags: string[]
  pics: string[]
  repository: string
  url: string
  type: string
  code: {
    [key: number]: {
      code: string
      explanation: string
      name: string
    }
  }
  state: string
  tecnos: any[]
}

export type ProjectRecord = Record<number, Project>

export type Hobbie = {
  icon: {
    Light: string
  },
  name: string
}

export type HobbieRecord = Record<number, Hobbie>

export type mainSkill = {
  name: string
  description: string
}

export type mainSkillRecord = Record<number, mainSkill>

export type mainSkillsDict = {
  soft: mainSkillRecord
  technical: mainSkillRecord
}