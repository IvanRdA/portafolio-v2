import { SnippetRecord } from "../../types";

export const SNIPPETS_DICTIONARY: SnippetRecord = {
  0: {
    title: "Main.Snippets.0.title",
    platform: "AlgoExpert",
    type: "Main.Snippets.0.type",
    description: "Main.Snippets.0.description",
    solution: "Main.Snippets.0.solution",
    complexityAnalysis: "O(n) time, O(1) space => n = array.length",
    code: `
        function searchForRange(array, target) {
          let range = [-1, -1]
          let i = 0
          let j = array.length - 1
          for(i; i <= array.length -1; i++){
            if(range[0] === -1 && array[i] === target){
              range[0] = i
            }
    
            if(range[1] === -1 && array[j] === target){
              range[1] = j
            }
    
            if(range[0] !== -1 && range[1] !== -1){
              return range
            }
            j--
          }
          return range
        }
  
      `,
  },
  1: {
    title: "Main.Snippets.1.title",
    platform: "AlgoExpert",
    type: "Main.Snippets.1.type",
    description: "Main.Snippets.1.description",
    solution: "Main.Snippets.1.solution",
    complexityAnalysis: "O(nlog(n)) time, O(n) space => n = tasks.length",
    code: `
        function tasksAssignment(k, tasks) {
          const indexedTasks = tasks.map((value, index) => ({ value, index }))
          indexedTasks.sort((a, b) => a.value - b.value)
          let minTimes = []
  
          for(let i = 0; i < tasks.length / 2; i++){
            const minIdx = indexedTasks[i].index
            const maxIdx = indexedTasks[indexedTasks.length - 1 - i].index
            minTimes.push([minIdx, maxIdx])
          }
          return minTimes
        }
  
      `,
  },
  2: {
    title: "Main.Snippets.2.title",
    platform: "AlgoExpert",
    type: "Main.Snippets.2.type",
    description: "Main.Snippets.2.description",
    solution: "Main.Snippets.2.solution",
    complexityAnalysis: "O(n) time, O(1) space => n = array.length",
    code: `
        function twoNumberSum(array, target) {
          const start = 0
          const end = array. length - 1
  
          while(start < end){
            if(array[start] + array[end] === target){
              return [array[start], array[end]]
            }else if(array[start] + array[end] > target){
              end--
            }else if(array[start] + array[end] < target){
              start++
            }
          }
          return []
        }
  
      `,
  },
  3: {
    title: "Main.Snippets.3.title",
    platform: "AlgoExpert",
    type: "Main.Snippets.3.type",
    description: "Main.Snippets.3.description",
    solution: "Main.Snippets.3.solution",
    complexityAnalysis: "O(n) time, O(1) space => n = string.length",
    code: `
        function palindromeChecker(string) {
          const start = 0
          const end = array.length - 1
  
          for(start; start < end; start++){
            if(string.charAt(start) !== string.charAt(end)){
              return false
            }
            end--
          }
          return true
        }
  
      `,
  },
  4: {
    title: "Main.Snippets.4.title",
    platform: "AlgoExpert",
    type: "Main.Snippets.4.type",
    description: "Main.Snippets.4.description",
    solution: "Main.Snippets.4.solution",
    complexityAnalysis: "O(n) time, O(n) space => n = array.length",
    code: `
        function firstDuplicateValue(array) {
          const checkerDictionary = {}

          for(let i = 0; i <= array.length - 1; i++){
            if(checkerDictionary[array[i]]){
              return array[i]
            }else{
              checkerDictionary[array[i]] = true
            }
          }

          return undefined
        }
      `,
  },
  5: {
    title: "Main.Snippets.5.title",
    platform: "Project",
    type: "Main.Snippets.5.type",
    description: "Main.Snippets.5.description",
    solution: "Main.Snippets.5.solution",
    complexityAnalysis: "O(n) time, O(n) space => n = stars",
    code: `
      export async function starProceduralProcess(
        systemSKU: string
      ): Promise<Star[]> {
        let finalStars: Star[] = []
        // * THROW A DICE TO GET NUMBER OF STARS IN THE SYSTEM *
        const maxStars = new Dice(4).getThrow() + 1
      
        // * CREATE AN ARRAY WITH THE CREATED STARS *
        for (let i = 0; i <= maxStars; i++) {
          finalStars.push(new Star())
        }
      
        // * FILTER THE ARRAY AND GET JUST BLACK HOLES *
        const hasBH = finalStars.filter((star) => {
          return star.starClassName === 'Black hole'
        })
        // * FILTER THE ARRAY AND GET JUST NEUTRONS STARS *
        const hasNeutrons = finalStars.filter((star) => {
          return star.starClassName === 'Neutrons star'
        })
      
        // * CHECK IF THE ARRAY HAS ONE OR MORE NEUTRONS STARS. IF SO GET THE FIRST ONE, ASSIGN IT AS MAIN WITH AN ORBITAL OF 0 AND RETURN THE ARRAY *
        if (hasNeutrons.length >= 1) {
          finalStars = [hasNeutrons[0]]
          finalStars[0].isMain = true
          finalStars[0].orbital = 0
      
          await finalStars[0].storeStar(systemSKU).catch((error: any) => {
            throw new DatabaseOperation('Could not store star in database.')
          })
      
          return finalStars
        }
        // * CHECK IF THE ARRAY HAS ONE OR MORE BLACK HOLES. IF SO, THROW ANOTHER DICE AND CHECK IF IT'S BIGGER THAN 0.8, IF THAT'S TRUE CREATE A SECOND BLACK HOLE. DELETE THE REST OF STARS CREATED AND RETURN THE ARRAY *
        if (hasBH.length >= 1) {
          const dice = new Dice(1).getThrow(false)
          finalStars = [hasBH[0]]
      
          if (dice >= 0.8) {
            finalStars.push(new Star(7))
            finalStars[1].isMain = true
            finalStars[1].orbital = 1
      
            await finalStars[1].storeStar(systemSKU).catch((error: any) => {
              throw new DatabaseOperation('Could not store star in database.')
            })
          }
      
          finalStars[0].isMain = true
          finalStars[0].orbital = 1
      
          await finalStars[0].storeStar(systemSKU).catch((error: any) => {
            throw new DatabaseOperation('Could not store star in database.')
          })
      
          return finalStars
        }
      
        // * HANDLE THE CASES WHERE BLACK HOLES EITHER NEUTRONS STARS WERE CREATED *
        const sortedByMax = finalStars.sort((a: any, b: any): number => {
          return a.maxPerSystem - b.maxPerSystem
        })
        // * GET THE SORTED ARRAY BY MAX STARS PER SYSTEM, GET THE FIRST ELEMENT (ONE WITH LESS STARS ALLOWED) AND DELETE ELEMENTS STILL ARRAY LENGTH AND MAX PER SYSTEM ARE EQUALS *
        while (sortedByMax.length > sortedByMax[0].maxPerSystem) {
          sortedByMax.pop()
        }
      
        // * SORT THE RESULTANT ARRAY BY MASS IN ORDER TO SELECT THE MAIN STAR AND ORBITALS *
        const sortedByMass = sortedByMax.sort((a: any, b: any): number => {
          return b.mass - a.mass
        })
      
        if (sortedByMax.length > 2) {
          // * IN CASE OF THREE OR MORE STARS, MOST MASSIVE IS SELECTED AS MAIN AND ORBITAL 0 AND THE REST AS NON-MAIN AND ORBITAL 1 *
          sortedByMass[0].isMain = true
          sortedByMass[0].orbital = 0
          await sortedByMass[0].storeStar(systemSKU).catch((error: any) => {
            throw new DatabaseOperation('Could not store star in database.')
          })
      
          for (let s = 1; s <= sortedByMass.length - 1; s++) {
            sortedByMass[s].isMain = false
            sortedByMass[s].orbital = 1
      
            await sortedByMass[s].storeStar(systemSKU).catch((error: any) => {
              throw new DatabaseOperation('Could not store star in database.')
            })
          }
      
          return sortedByMass
        } else if (sortedByMax.length === 2) {
          // * IN CASE OF TWO STARS, CHECK IF THE DIFFERENCE OF MASSES ARE LESS OF 0.7 SOLAR MASS UNITS, IN THAT CASE BOTH ARE MAIN AND HAVE ORBITAL 1, FOLLOW THE LOGIC OF PREVIOUS STEP *
          if (sortedByMass[0].mass - sortedByMass[1].mass <= 0.7) {
            sortedByMass[0].isMain = true
            sortedByMass[0].orbital = 1
            sortedByMass[1].isMain = true
            sortedByMass[1].orbital = 1
      
            await sortedByMass[0].storeStar(systemSKU).catch((error: any) => {
              throw new DatabaseOperation('Could not store star in database.')
            })
            await sortedByMass[1].storeStar(systemSKU).catch((error: any) => {
              throw new DatabaseOperation('Could not store star in database.')
            })
      
            return sortedByMass
          } else {
            sortedByMass[0].isMain = true
            sortedByMass[0].orbital = 0
            sortedByMass[1].isMain = false
            sortedByMass[1].orbital = 1
      
            await sortedByMass[0].storeStar(systemSKU).catch((error: any) => {
              throw new DatabaseOperation('Could not store star in database.')
            })
            await sortedByMass[1].storeStar(systemSKU).catch((error: any) => {
              throw new DatabaseOperation('Could not store star in database.')
            })
          }
        } else {
          // * IN CASE OF ONE STAR JUST MARK AS MAIN AND ORBITAL 0 *
          sortedByMax[0].isMain = true
          sortedByMax[0].orbital = 0
        }
      
        for (let i = 0; i <= sortedByMax.length - 1; i++) {
          await sortedByMax[0].storeStar(systemSKU).catch((error: any) => {
            throw new DatabaseOperation('Could not store system in database.')
          })
        }
      
        return sortedByMax
      }
      `,
  },
  6: {
    title: "Main.Snippets.6.title",
    platform: "Project",
    type: "Main.Snippets.6.type",
    description: "Main.Snippets.6.description",
    solution: "Main.Snippets.6.solution",
    complexityAnalysis: " / ",
    code: `
        export function paginateResponse(
        page: number,
        limit: number,
        items: any[]
      ): Record<string, any> {
        const startIdx = (page - 1) * limit;
        const endIdx = startIdx + limit;

        const paginated = items.slice(startIdx, endIdx);

        return {
          totalItems: paginated.length,
          currentPage: page,
          itemsPerPage: limit,
          firstItem: startIdx + 1,
          lastItem: startIdx + limit,
          items: paginated,
        };
      }
      `,
  },
};
