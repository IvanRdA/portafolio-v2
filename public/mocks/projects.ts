import { ProjectRecord } from "../../types";
import {
  mainStackDictionary,
  OtherTechsDictionary,
  OtherNonMainTechsDictionary,
} from "./stacks";

export const projectTags: string[] = [
  "procedurals", // 0
  "recursivity", // 1
  "SPA", // 2
  "algorithms", // 3
  "security", // 4
  "API", // 5
  "state handleling", // 6
  "design", // 7
  "3D", // 8
  "dependencies", // 9
  "testing", // 10
  "database", // 11
  "CRUD", // 12
  "CORS", // 13
  "business", // 14
];

export const projectsDictionary: ProjectRecord = {
  0: {
    title: "Projects.ProjectList.0.title",
    problem: "Projects.ProjectList.0.problem",
    solution: "Projects.ProjectList.0.solution",
    tags: [
      projectTags[2],
      projectTags[3],
      projectTags[11],
      projectTags[12],
      projectTags[14],
    ],
    pics: [
      "/projects/bdm/login.jpg",
      "/projects/bdm/employees.jpg",
      "/projects/bdm/holidays.jpg",
      "/projects/bdm/employeeDetail.jpg",
    ],
    repository: "https://github.com/IvanRdA/BusinessDataManager-showcase",
    url: "",
    type: "Fullstack",
    code: {
      0: {
        code: `import { Schema, model } from 'mongoose'
        import { REGEX } from '../../globals/assets/regex'
        
        const employeeModel = new Schema({
            info: {
                firstName: {type: String, required: true, validate: REGEX.firstNameString},
                surName: {type: String, required: true, validate: REGEX.fullNameString},
                dni: {type: String, required: true, unique: true, validate: REGEX.dniString},
                ssAffiliation: {type: String, required: true, unique: true, validate: REGEX.ssString},
                dob: {type: Date},
                email: {type: String, required: true, unique: true, validate: REGEX.emailString},
                password: {type: String, required: true, default: 'Testing4Password$Default', validate: REGEX.rawPassword},
                phone: {type: String, required: true, validate: REGEX.phoneString},
            },
            contractual: {
                startedAt: {type: Date},
                type: {type: String, required: true, validate: REGEX.contractType},
                hours: {type: Number, min: 1, max: 40, default: 30},
                duration: {type: Number, min: 0, max: 24, default: 9},
                finishAt: {type: Date},
                role: {type: String, required: true, validate: REGEX.roleString, default: 'Camarero'},
                category: {type: String, validate: REGEX.roleString},
                monthlyCost: {type: Number, min: 0},
                nextPossibleReturn: {type: Date},
                lastActivation: { type: Date}
            
            },
            business: {
                assignedTeam: {type: String, default: 'Sala', validate: REGEX.assignedEmployeeTeam},
                turnAssigned: {type: String, default: 'Comodín', validate: REGEX.assignedEmployeeTurn},
                isActive: {type: Boolean, default: true},
                registers: 
                    {
                        type: Schema.Types.Mixed,
                        default: {},
                    },
            },
        })
        
        const EMPLOYEE = model('Employee', employeeModel)
        
        export default EMPLOYEE`,
        explanation: "Projects.ProjectList.0.codes.0.explanation",
        name: "Projects.ProjectList.0.codes.0.name",
      },
      1: {
        code: `
        // loginController.ts
        export default async function loginController(email: string, password: string): Promise<APIResponse> {
          try{
              const checkedEmail = await EMPLOYEE.findOne({'info.email': email}).catch((e: any) => {
                  throw new DatabaseOperation('No se puede comparar el email del empleado en la base de datos. Pruebe de nuevo más tarde.')
              })
              
              if(checkedEmail === null || checkedEmail === undefined){
                  throw new NoRecordError('No se encuentra a ningún empleado con ese email asignado.')
              }else{
                  const hashed = checkedEmail?.info?.password ?? ''
                  const passValidate = await bcrypt.compare(password, hashed)
                  const role = checkedEmail?.contractual?.role ?? ''
                  const mail = checkedEmail?.info?.email ?? ''
                  
                  if(passValidate){
                      if(role !== 'Director'){
                          throw new UserNotAllowed("El usuario no está autorizado a iniciar sesión.")
                      }else{
                          const secret: string = process.env.SECRET_TOKEN as string
                          const token = jwt.sign({ userId: checkedEmail._id, email: email }, secret, { expiresIn: '2h' })
                          
                          return {error: null, message: 'Login correcto.', data: {name: checkedEmail.info?.surName, checkedEmail.info?.firstName, token: token}}
                      }
                  }else{
                      throw new NoRecordError('Las contraseñas no coinciden.')
                  }
              }
          }catch(error){
              return handleError(error)
          }
      }
      
      // loginRoute.ts
      import { Router } from 'express'
      import { REGEX } from '../../globals/assets/regex'
      import { ValidationError } from '../../globals/classes/Errors'
      import { handleError } from '../../globals/assets/libs'
      import loginController from '../controllers/login.controller'

      const router = Router()

      export const loginRoute = router.post("/login", async (req, res) => {
          try{
              const { email, password } = req.body
          
              if(!REGEX.emailString.test(email)){
                  throw new ValidationError('El campo email no tiene un formato válido.')
              }
              else if(!REGEX.rawPassword.test(password)){
                  throw new ValidationError('El campo contraseña no tiene un formato válido.')
              }

              const response = await loginController(email, password)
              if(response.error === null){
                  res.status(200).json(response)
              }else{
                  res.status(401).json(response)
              }

          }catch(error: any){
              const handleled = handleError(error)
              if(handleled.error === 'Database operation error' || handleled.error === 'Database connection error'){
                  res.status(500).json(handleled)
              }else if(handleled.error === 'Field validation error' || handleled.error === 'No record error'){
                  res.status(400).json(handleled)
              }else if(handleled.error === 'Null token' || handleled.error === 'Invalid token'){
                  res.status(401).json(handleled)
              }else{
                  res.status(304).json(handleled)
              }
          }
      })`,
        explanation: "Projects.ProjectList.0.codes.1.explanation",
        name: "Projects.ProjectList.0.codes.1.name",
      },
      2: {
        code: `
        import mongoose from 'mongoose'
        import { DatabaseConnection } from '../globals/classes/Errors'

        const dbConnection = async (maxTries: number = 6): Promise<void> => {
            const dbURI = process.env.DB_URI ?? ''
            let currTry = 1

            const connectWithRetry = async (): Promise<void> => {
                try{
                    const conn = await mongoose.connect(dbURI)
                    if (conn) {
                        console.log('⚡️[SERVER SAYS]: \nDatabase connected successfully.')
                        return
                      }
                }catch (error: any) {
                    console.error(
                      "⛔️[ERROR]: \nError connecting to database: " + error.message
                    )
                    if (currTry < maxTries) {
                      console.log(
                        "⚡️[SERVER SAYS]: \nRetrying database connection (Retry" + currTry}/(
                          maxTries - 1)
                        )+ "..."
                      )}
                      currTry += 1
                      await new Promise((resolve) => setTimeout(resolve, 2000))
                      return connectWithRetry()
                    } else {
                      throw new DatabaseConnection('Se ha excedido el número de reintentos de conexión a la base de datos. Vuelva a probarlo más tarde.')
                    }
                  }
                }
                try {
                  await connectWithRetry()
                } catch (error: any) {
                  if (error instanceof DatabaseConnection) {
                    console.log(
                      "⛔️ ⛔️ ⛔️[CRITICAL ERROR]: \nImpossible to connect to the database..." + error.message
                    )
                    return
                  }
            }
        }

        export default dbConnection`,
        explanation: "Projects.ProjectList.0.codes.2.explanation",
        name: "Projects.ProjectList.0.codes.2.name",
      },
      3: {
        code: `
        "use client";
        import Image from "next/image";
        import { Toaster, toast } from "sonner";
        import { useState } from "react";
        import YearTitle from "./YearTitle";
        import { useRouter } from "next/navigation";
        import EmptyItemList from "../globals/EmptyItemList";
        import { YearsData } from "../../../types";
        import {
          availableEmployees,
          getAllDaysFromYear,
          generateEmptySchedule,
          defaultDay,
        } from "@/CI/public.constants";
        import isSunday from "date-fns/isSunday";
        import { fetchUpdateEmployeeHolidays } from "@/CI/private.constants";

        export default function AllHolidaysTable(props: any) {
          const router = useRouter();

          const { employees } = props;
          const activeEmployees = availableEmployees(employees);

          const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

          const allDaysOfYear = getAllDaysFromYear(currentYear);

          const [editingYear, setEditingYear] = useState<number | null>(null);

          const handleYearClick = (year: number) => {
            setEditingYear(year);
          };

          const handleYearChange = (newYear: number) => {
            setCurrentYear(newYear);
            setEditingYear(null);
            getScheduleByYear(newYear, setYearsData);
          };

          const getScheduleByYear = (
            year: number,
            setYearsData: React.Dispatch<React.SetStateAction<YearsData[]>>
          ) => {
            setYearsData((prevData: any) =>
              prevData.map((employee: any) => {
                const updatedEmployee = JSON.parse(JSON.stringify(employee));

                if (updatedEmployee[year]) {
                  // Si ya existe el año, simplemente devolvemos el mismo objeto
                  return updatedEmployee;
                } else {
                  // Si no existe el año, creamos una nueva entrada
                  updatedEmployee[year] = {};

                  getAllDaysFromYear(year).map((day: Date, idx: number) => {
                    updatedEmployee[year][idx] = {
                      date: day,
                      isLockedDay: false,
                      isFNR: false,
                      isSunday: isSunday(day),
                      isFreeDay: false,
                      isConfirmedSchedule: false,
                      scheduleTimes: [],
                      isActiveHoliday: false,
                      isEnjoyedHoliday: false,
                      extraTimeAmount: 0,
                      isReturnedFNR: false,
                    };
                  });

                  return updatedEmployee;
                }
              })
            );
          };
          const starterEmployees = generateEmptySchedule(activeEmployees, currentYear);
          const [yearsData, setYearsData] = useState<YearsData[]>(starterEmployees);

          const handleCellClick = (e: any) => {
            e.preventDefault();
            const empIndex = parseInt(e.target.getAttribute("data-emp-id"));
            const dayIndex = parseInt(e.target.getAttribute("data-day-id"));

            if (
              empIndex >= 0 &&
              empIndex < yearsData.length &&
              yearsData[empIndex] &&
              yearsData[empIndex][currentYear] &&
              !yearsData[empIndex][currentYear][dayIndex].isLockedDay
            ) {
              if (
                empIndex >= 0 &&
                empIndex < yearsData.length &&
                yearsData[empIndex] &&
                yearsData[empIndex][currentYear] &&
                yearsData[empIndex][currentYear][dayIndex]
              ) {
                setYearsData((prevData: any) => {
                  const updatedData = JSON.parse(JSON.stringify(prevData));
                  const updatedEmployee = { ...updatedData[empIndex] };

                  updatedEmployee[currentYear][dayIndex].isActiveHoliday =
                    !updatedEmployee[currentYear][dayIndex].isActiveHoliday;

                  updatedData[empIndex] = updatedEmployee;
                  return updatedData;
                });
              }
            }
          };

          const handleCelldbClick = (e: any) => {
            e.preventDefault();
            const empIndex = parseInt(e.target.getAttribute("data-emp-id"));
            const dayIndex = parseInt(e.target.getAttribute("data-day-id"));

            if (
              empIndex >= 0 &&
              empIndex < yearsData.length &&
              yearsData[empIndex] &&
              yearsData[empIndex][currentYear] &&
              !yearsData[empIndex][currentYear][dayIndex].isLockedDay
            ) {
              if (
                empIndex >= 0 &&
                empIndex < yearsData.length &&
                yearsData[empIndex] &&
                yearsData[empIndex][currentYear] &&
                yearsData[empIndex][currentYear][dayIndex]
              ) {
                setYearsData((prevData: any) => {
                  const updatedData = JSON.parse(JSON.stringify(prevData));
                  const updatedEmployee = { ...updatedData[empIndex] };

                  updatedEmployee[currentYear][dayIndex].isEnjoyedHoliday =
                    !updatedEmployee[currentYear][dayIndex].isEnjoyedHoliday;

                  updatedEmployee[currentYear][dayIndex].isActiveHoliday = false;

                  updatedData[empIndex] = updatedEmployee;
                  return updatedData;
                });
              }
            }
          };

          const handleChangeYear = (step: number) => {
            const newYear = currentYear + step;
            setCurrentYear(newYear);
            setEditingYear(null);
            getScheduleByYear(newYear, setYearsData);
          };

          const saveToDatabase = async () => {
            // Lógica para guardar el estado en la base de datos
            const fetchReq = async () => {
              try {
                for (let i = 0; i <= activeEmployees.length - 1; i++) {
                  const state = {
                    year: currentYear,
                    [currentYear]: {},
                  };
                  for (
                    let d = 0;
                    d <= Object.keys(yearsData[i][currentYear]).length - 1;
                    d++
                  ) {
                    const getDefaultDay = defaultDay(yearsData[i][currentYear][d].date);
                    if (
                      getDefaultDay.isLockedDay !==
                        yearsData[i][currentYear][d].isLockedDay ||
                      getDefaultDay.isActiveHoliday !==
                        yearsData[i][currentYear][d].isActiveHoliday ||
                      getDefaultDay.isEnjoyedHoliday !==
                        yearsData[i][currentYear][d].isEnjoyedHoliday ||
                      getDefaultDay.isFNR !== yearsData[i][currentYear][d].isFNR ||
                      getDefaultDay.isSunday !==
                        yearsData[i][currentYear][d].isSunday ||
                      getDefaultDay.isFreeDay !==
                        yearsData[i][currentYear][d].isFreeDay ||
                      getDefaultDay.isConfirmedSchedule !==
                        yearsData[i][currentYear][d].isConfirmedSchedule ||
                      yearsData[i][currentYear][d].scheduleTimes.length > 0 ||
                      yearsData[i][currentYear][d].extraTimeAmount !== 0 ||
                      getDefaultDay.isReturnedFNR !==
                        yearsData[i][currentYear][d].isReturnedFNR ||
                      yearsData[i][currentYear][d].incidenceType ||
                      yearsData[i][currentYear][d].incidenceDescription ||
                      yearsData[i][currentYear][d].incidenceStartDate ||
                      yearsData[i][currentYear][d].incidenceEndDate ||
                      yearsData[i][currentYear][d].incidenceInhability ||
                      yearsData[i][currentYear][d].reportType ||
                      yearsData[i][currentYear][d].reportDescription ||
                      yearsData[i][currentYear][d].reportStartDate ||
                      yearsData[i][currentYear][d].reportEndDate ||
                      yearsData[i][currentYear][d].reportInhability ||
                      yearsData[i][currentYear][d].sanctionLevel
                    ) {
                      state[currentYear][d] = yearsData[i][currentYear][d];
                    }
                  }
                  const res = await fetchUpdateEmployeeHolidays(
                    state,
                    activeEmployees[i]._id ?? ""
                  );
                }
                return true;
              } catch (e: any) {
                console.log(e);
                return false;
              }
            };
            try {
              // Implementa la lógica de envío a la base de datos aquí
              const updateHolidays = await fetchReq();

              if (updateHolidays) {
                toast.success("Vacaciones actualizadas correctamente.");
                router.refresh();
              }
            } catch (error) {
              toast.error("Error guardando vacaciones.");
              console.error("Error al guardar en la base de datos:", error);
            }
          };

          return (
            <>
              <Toaster richColors position="top-center" />
              <div className="flex flex-col justify-center items-center">
                {employees.length > 0 ? (
                  <>
                    <button
                      className="flex flex-row gap-2 items-center justify-center bg-gradient-to-r from-oliveGreen-800 to-oliveGreen-700 hover:scale-105 cursor-pointer p-2 w-[85%] text-mainRed-800 text-xl"
                      onClick={saveToDatabase}
                    >
                      <Image
                        src="/icons/red/save.svg"
                        width={18}
                        height={18}
                        alt="Guardar cambios"
                        title="Guardar cambios en vacaciones"
                      />
                      Guardar cambios
                    </button>
                    <div className="flex flex-row justify-evenly p-2 gap-2 bg-white w-[85%]">
                      <button onClick={() => handleChangeYear(-1)} data-step="prev">
                        <Image
                          src="/icons/red/prev.svg"
                          width={18}
                          height={18}
                          alt="Año previo"
                          title="Año previo"
                        />
                      </button>

                      <h3
                        className="text-center text-3xl text-mainRed-800 font-marck"
                        onClick={() => handleYearClick(currentYear)}
                      >
                        {editingYear !== null ? (
                          <YearTitle
                            year={currentYear}
                            onYearChange={handleYearChange}
                          />
                        ) : (
                          currentYear
                        )}
                      </h3>

                      <button onClick={() => handleChangeYear(1)} data-step="next">
                        <Image
                          src="/icons/red/next.svg"
                          width={18}
                          height={18}
                          alt="Próximo año"
                          title="Próximo"
                        />
                      </button>
                    </div>

                    <div className="w-[85%] table-container">
                      <table className="font-fairplay text-sm text-white sticky-header-table">
                        <thead>
                          <tr>
                            <th>Empleado</th>
                            {allDaysOfYear.map((date: any, idx: number) => {
                              return (
                                <th
                                  key={idx}
                                  className={
                                    isSunday(new Date(date)) === true
                                      ? "verticalAligned bg-cyan-600/50"
                                      : "verticalAligned"
                                  }
                                >
                                  {date.toLocaleDateString("es-ES", {
                                    year: "2-digit",
                                    month: "2-digit",
                                    day: "2-digit",
                                  })}
                                </th>
                              );
                            })}
                          </tr>
                        </thead>

                        <tbody>
                          {yearsData.map((employee: any, empId: number) => (
                            <tr key={activeEmployees[empId]?._id}>
                              <td>
                                {activeEmployees[empId]?.info.surName},{" "}
                                {activeEmployees[empId]?.info.firstName}
                              </td>
                              {allDaysOfYear.map((date: any, idx: number) => (
                                <td
                                  onClick={handleCellClick}
                                  onDoubleClick={handleCelldbClick}
                                  key={date}
                                  data-emp-id={empId}
                                  data-day-id={idx}
                                  className={
                                    yearsData[empId] &&
                                    yearsData[empId][currentYear] &&
                                    yearsData[empId][currentYear][idx] &&
                                    yearsData[empId][currentYear][idx].isLockedDay
                                      ? "bg-black"
                                      : yearsData[empId] &&
                                        yearsData[empId][currentYear] &&
                                        yearsData[empId][currentYear][idx] &&
                                        yearsData[empId][currentYear][idx]
                                          .isEnjoyedHoliday
                                      ? "bg-green-500"
                                      : yearsData[empId] &&
                                        yearsData[empId][currentYear] &&
                                        yearsData[empId][currentYear][idx] &&
                                        yearsData[empId][currentYear][idx]
                                          .isActiveHoliday
                                      ? "bg-yellow-400"
                                      : isSunday(new Date(date))
                                      ? "bg-cyan-600/40"
                                      : "bg-white"
                                  }
                                ></td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <EmptyItemList item="empleados" />
                )}
              </div>
            </>
          );
        }
`,
        explanation: "Projects.ProjectList.0.codes.3.explanation",
        name: "Projects.ProjectList.0.codes.3.name",
      },
    },
    state: "Projects.States.inProgress",
    tecnos: [
      mainStackDictionary["M"],
      mainStackDictionary["E"],
      mainStackDictionary["R"],
      mainStackDictionary["N"],
      OtherTechsDictionary["TS"],
      OtherTechsDictionary["NJS"],
      OtherTechsDictionary["TWD"],
    ],
  },
  1: {
    title: "Projects.ProjectList.1.title",
    problem: "Projects.ProjectList.1.problem",
    solution: "Projects.ProjectList.1.solution",
    tags: [
      projectTags[0],
      projectTags[2],
      projectTags[6],
      projectTags[12],
      projectTags[11],
    ],
    pics: [
      "/projects/ssins/simulation.jpg",
      "/projects/ssins/simulationTwo.jpg",
      "/projects/ssins/jsonView.jpg",
    ],
    repository: "https://github.com/IvanRdA/SevenSins-showcase",
    url: "",
    type: "Fullstack",
    code: {
      0: {
        code: `
        import { randomUUID } from 'crypto'
        import { Habitability, StarResources, StarDefinitions } from '../../types'
        import Dice from '../../globals/classes/Dice'
        import STAR from '../models/star.model'
        import { handleError } from '../../globals/assets/libs'
        import { DatabaseOperation } from '../../globals/classes/Errors'
        import { starProbs } from '../assets/constants'
        import { generateEntityName } from '../assets/libs'


        export default class Star {
          name: string
          starClassName: string
          sku: string
          classification: number
          starClass: string
          temperature: number
          color: string
          mass: number
          radius: number
          gravity: number
          isMain: boolean
          orbital: number
          orbitalStarter: number
          resources: StarResources
          habitabilityLevels: Habitability
          maxPerSystem: number

          
          static starDefinitions: StarDefinitions = {
            0: {
              class: 'O',
              temperature: {
                min: 33000,
                max: 150000
              },
              color: '#4D99CE', // BLUE
              mass: {
                min: 16,
                max: 50
              },
              radius: {
                min: 8.6,
                max: 25
              },
              orbitalStarter: 6,
              className: 'Blue supergiant',
              habitabilityLevels: {
                cold: 0,
                temperate: 0.6,
                warm: 1
              },
              resources: {
                primary: {
                  energy: {
                    electromagnetism: 5000 * new Dice(2).getThrow(false),
                    antiMatter: 2500 * new Dice(2).getThrow(false),
                    exoticMatter: 1200 * new Dice(2).getThrow(false),
                  }
                }
              },
              maxPerSystem: 1
            },
            1: {
              class: 'B',
              temperature: {
                min: 10000,
                max: 32999
              },
              color: '#00CCFF', // BLUISH
              mass: {
                min: 2.1,
                max: 15.9
              },
              radius: {
                min: 6.8,
                max: 12.59
              },
              orbitalStarter: 5,
              className: 'Blue giant',
              habitabilityLevels: {
                cold: 0,
                temperate: 0.6,
                warm: 1
              },
              resources: {
                primary: {
                  energy: {
                    electromagnetism: 4000 * new Dice(2).getThrow(false),
                    antiMatter: 1800 * new Dice(2).getThrow(false),
                    exoticMatter: 950 * new Dice(2).getThrow(false),
                  }
                }
              },
              maxPerSystem: 1
            },
            2: {
              class: 'A',
              temperature: {
                min: 7500,
                max: 9999
              },
              color: '#FFFFFF', // WHITE
              mass: {
                min: 1.4,
                max: 2
              },
              radius: {
                min: 1.4,
                max: 2.79
              },
              orbitalStarter: 4,
              className: 'White dwarf',
              habitabilityLevels: {
                cold: 0.2,
                temperate: 0.5,
                warm: 0.8
              },
              resources: {
                primary: {
                  energy: {
                    electromagnetism: 3500 * new Dice(2).getThrow(false),
                    darkMatter: 600 * new Dice(2).getThrow(false),
                    exoticMatter: 1350 * new Dice(2).getThrow(false),
                  }
                }
              },
              maxPerSystem: 3
            },
            3: {
              class: 'F',
              temperature: {
                min: 6000,
                max: 7499
              },
              color: '#FCE79A', // WHITE-YELLOW
              mass: {
                min: 1.04,
                max: 1.39
              },
              radius: {
                min: 2.15,
                max: 4.39
              },
              orbitalStarter: 2,
              className: 'Brown dwarf',
              habitabilityLevels: {
                cold: 0.4,
                temperate: 0.8,
                warm: 0.8
              },
              resources: {
                primary: {
                  energy: {
                    electromagnetism: 1500 * new Dice(2).getThrow(false),
                    antiMatter: 300 * new Dice(2).getThrow(false),
                    exoticMatter: 400 * new Dice(2).getThrow(false),
                  }
                }
              },
              maxPerSystem: 3
            },
            4: {
              class: 'G',
              temperature: {
                min: 5200,
                max: 5999
              },
              color: '#FFCD3C', // YELLOW
              mass: {
                min: 0.89,
                max: 1.03
              },
              radius: {
                min: 0.96,
                max: 3.14
              },
              orbitalStarter: 1,
              className: 'Yellow dwarf',
              habitabilityLevels: {
                cold: 0.6,
                temperate: 1,
                warm: 0.6
              },
              resources: {
                primary: {
                  energy: {
                    electromagnetism: 1200 * new Dice(2).getThrow(false),
                    antiMatter: 300 * new Dice(2).getThrow(false),
                    exoticMatter: 300 * new Dice(2).getThrow(false),
                  }
                }
              },
              maxPerSystem: 3
            },
            5: {
              class: 'K',
              temperature: {
                min: 3700,
                max: 5199
              },
              color: '#FF9529', // ORANGE
              mass: {
                min: 0.45,
                max: 0.79
              },
              radius: {
                min: 0.7,
                max: 0.95
              },
              orbitalStarter: 1,
              className: 'Subdwarf',
              habitabilityLevels: {
                cold: 0.8,
                temperate: 0.8,
                warm: 0.6
              },
              resources: {
                primary: {
                  energy: {
                    electromagnetism: 1000 * new Dice(2).getThrow(false),
                    antiMatter: 200 * new Dice(2).getThrow(false),
                    exoticMatter: 220 * new Dice(2).getThrow(false),
                  }
                }
              },
              maxPerSystem: 4
            },
            6: {
              class: 'M',
              temperature: {
                min: 1000,
                max: 3699
              },
              color: '#BB1122', // RED
              mass: {
                min: 0.4,
                max: 2.45
              },
              radius: {
                min: 0.1,
                max: 0.69
              },
              orbitalStarter: 1,
              className: 'Red dwarf',
              habitabilityLevels: {
                cold: 1,
                temperate: 0.6,
                warm: 0.6
              },
              resources: {
                primary: {
                  energy: {
                    electromagnetism: 950 * new Dice(2).getThrow(false),
                    antiMatter: 180 * new Dice(2).getThrow(false),
                    exoticMatter: 180 * new Dice(2).getThrow(false),
                  }
                }
              },
              maxPerSystem: 4
            },
            7: {
              class: 'BH',
              temperature: {
                min: 150999,
                max: 300000
              },
              color: '#000000', // BLACK
              mass: {
                min: 40,
                max: 500
              },
              radius: {
                min: 8,
                max: 120
              },
              orbitalStarter: 6,
              className: 'Black hole',
              habitabilityLevels: {
                cold: 1,
                temperate: 0.4,
                warm: 0.2
              },
              resources: {
                primary: {
                  energy: {
                    electromagnetism: 8000 * new Dice(2).getThrow(false),
                    darkMatter: 5000 * new Dice(2).getThrow(false),
                    antiMatter: 3500 * new Dice(2).getThrow(false),
                    exoticMatter: 4000 * new Dice(2).getThrow(false),
                  }
                }
              },
              maxPerSystem: 2
            },
            8: {
              class: 'N',
              temperature: {
                min: 180000,
                max: 300000
              },
              color: '#000000', // WHITE
              mass: {
                min: 60,
                max: 200
              },
              radius: {
                min: 3,
                max: 9
              },
              orbitalStarter: 8,
              className: 'Neutrons star',
              habitabilityLevels: {
                cold: 0.2,
                temperate: 0.4,
                warm: 1
              },
              resources: {
                primary: {
                  energy: {
                    electromagnetism: 12500 * new Dice(2).getThrow(false),
                    antiMatter: 3000 * new Dice(2).getThrow(false),
                    exoticMatter: 6000 * new Dice(2).getThrow(false),
                  }
                }
              },
              maxPerSystem: 1
            }
          }

          constructor(
            classification?: number,
            orbital?: number,
            name?: string,
            starClassName?: string,
            starClass?: string,
            color?: string,
            temperature?: number,
            radius?: number,
            mass?: number,
            orbitalStarter?: number,
            resources?: StarResources
          ) {
            this.orbital = orbital ?? 0
            this.classification = classification ?? this.getStarClassification()
            this.name = name ?? generateEntityName()
            this.starClassName = starClassName ?? this.getStarClassName()
            this.sku = randomUUID()
            this.starClass = starClass ?? this.getStarClass()
            this.temperature = temperature ?? this.getStarTemperature()
            this.color = color ?? this.getStarColor()
            this.mass = mass ?? this.getStarMass()
            this.radius = radius ?? this.getStarRadius()
            this.gravity = this.calculateGravity()
            this.orbitalStarter = orbitalStarter ?? this.getStarOrbitalStarter()
            this.isMain = false
            this.resources = resources ?? this.getStarResources()
            this.habitabilityLevels = this.getHabitabilityLevels()
            this.maxPerSystem = this.getStarMaxPerSystem()
          }

          private getStarClassification(): number {
            const totalWeight = starProbs.reduce(
              (sum, probability) => sum + probability,
              0
            )
            const randomValue = new Dice(totalWeight).getThrow(false)

            let accumulatedWeight = 0
            for (let i = 0; i <= starProbs.length - 1; i++) {
              accumulatedWeight += starProbs[i]
              if (randomValue <= accumulatedWeight) {
                return i
              }
            }

            return 5
          }

          private getStarClassName(): string {
            return Star.starDefinitions[this.classification].className
          }

          private getStarTemperature(): number {
            let temperature = Math.floor(
              Star.starDefinitions[this.classification].temperature.min
            )
            const diff =
              Star.starDefinitions[this.classification].temperature.max - temperature
            const temp = new Dice(diff).getThrow(false)

            return temperature + temp
          }

          private getStarColor(): string {
            return Star.starDefinitions[this.classification].color
          }

          private getStarMass(): number {
            let mass = Star.starDefinitions[this.classification].mass.min
            const diff = Star.starDefinitions[this.classification].mass.max - mass
            const massiveness = new Dice(diff).getThrow(false)

            return mass + massiveness
          }

          private getStarClass(): string {
            return Star.starDefinitions[this.classification].class
          }

          private getStarOrbitalStarter(): number {
            return Star.starDefinitions[this.classification].orbitalStarter
          }

          private getStarRadius(): number {
            let radius = Star.starDefinitions[this.classification].radius.min
            const diff = Star.starDefinitions[this.classification].radius.max - radius
            const radiusNum = new Dice(diff).getThrow(false)

            return radius + radiusNum
          }

          private calculateGravity(): number {
          const G = 0o66743
          
          return parseFloat((G * this.mass).toExponential(3))
          }

          private getStarResources(): StarResources {
            return Star.starDefinitions[this.classification].resources
          }

          private getHabitabilityLevels(): Habitability {
            return Star.starDefinitions[this.classification].habitabilityLevels
          }

          private getStarMaxPerSystem(): number {
            return Star.starDefinitions[this.classification].maxPerSystem
          }

          public async storeStar(
            systemTracker: string
          ): Promise<any> {
            try {
              const mapper = {
                name: this.name,
                starClassName: this.starClassName,
                sku: this.sku,
                starClass: this.starClass,
                temperature: this.temperature,
                color: this.color,
                mass: this.mass,
                radius: this.radius,
                gravity: this.gravity,
                isMain: this.isMain,
                orbital: this.orbital,
                orbitalStarter: this.orbitalStarter,
                resources: this.resources,
                habitabilityLevels: this.habitabilityLevels,
                system: systemTracker
              }
              
              const newStar = new STAR(mapper)
              await newStar.save().catch((e: any) => {
                throw new DatabaseOperation('Could not store star in database.')
              })

              return {
                error: null,
                message: 'Star stored correctly into Database.'
              }
            } catch (error: any) {
              return handleError(error)
            }
          }
        }
        `,
        explanation: "Projects.ProjectList.1.codes.0.explanation",
        name: "Projects.ProjectList.1.codes.0.name",
      },
      1: {
        code: `
        export const saveProceduralToDatabase = router.get(
          '/storeProcedural',
          async (_req, res) => {
            const newGalaxy = await mainProceduralProcess('Milky Way', 1000)
        
            try{
                await newGalaxy.storeGalaxy().catch((error: any) => {
                  throw new DatabaseOperation('Could not store galaxy in database.')
                  
                })
            }catch(error: any) {
              res.status(304).json(handleError(error))
            }
        
            res.status(200).json(newGalaxy)
            
          }
        )
        `,
        explanation: "Projects.ProjectList.1.codes.1.explanation",
        name: "Projects.ProjectList.1.codes.1.name",
      },
      2: {
        code: `
        import React, { useEffect, useState } from "react";
        import { Canvas } from "react-three-fiber";
        import GalacticSystem from "./GalacticSystem";
        import Controls from "./Controls";

        const GalaxyScene: React.FC = () => {
          const sys: any[] = [];
          const [systems, setSystems] = useState(sys);

          useEffect(() => {
            const fetchSystems = async () => {
              try {
                const response = await fetch("http://localhost:8080/procedural");
                const data = await response.json();

                for (let s = 0; s <= data.systems.length - 1; s++) {
                  const filteredStars = data.stars.filter((star: any) => {
                    return data.systems[s].stars.includes(star.sku);
                  });
                  data.systems[s].stars = filteredStars;
                }
                setSystems(data.systems);
              } catch (error) {
                console.error("Error al obtener los sistemas:", error);
              }
            };

            fetchSystems();
          }, []);

          return (
            <Canvas>
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              {systems.map((system, index) => (
                <GalacticSystem
                  key={index}
                  position={[system.position.x, system.position.y, system.position.z]}
                  color={system.stars[0].color}
                  name={system.stars[0].starClassName}
                  radius={system.stars[0].radius}
                />
              ))}
              <Controls />
            </Canvas>
          );
        };

        export default GalaxyScene;
        `,
        explanation: "Projects.ProjectList.1.codes.2.explanation",
        name: "Projects.ProjectList.1.codes.2.name",
      },
    },
    state: "Projects.States.inProgress",
    tecnos: [
      mainStackDictionary["M"],
      mainStackDictionary["E"],
      mainStackDictionary["R"],
      mainStackDictionary["N"],
      OtherTechsDictionary["TS"],
      OtherTechsDictionary["NJS"],
      OtherTechsDictionary["TWD"],
      OtherNonMainTechsDictionary["TJS"],
      OtherNonMainTechsDictionary["WSK"],
    ],
  },
  2: {
    title: "Projects.ProjectList.2.title",
    problem: "Projects.ProjectList.2.problem",
    solution: "Projects.ProjectList.2.solution",
    tags: [projectTags[6]],
    pics: [
      "/projects/cv/snippets.jpg",
      "/projects/cv/main.jpg",
      "/projects/cv/about.jpg",
    ],
    repository: "https://github.com/IvanRdA/portafolio-v1.0",
    url: "https://portafolio-v1-0-sigma.vercel.app",
    type: "Frontend",
    code: {
      0: {
        code: `
        "use client";

        import { useTranslation } from "react-i18next";
        import { HOBBIES_DICTIONARY } from "@/assets/constants";
        import SingleHobby from "./SingleHobby";

        export default function AboutMainSection() {
          const { t } = useTranslation();
          return (
            <>
              <strong>
                <h1 className="font-ojuju text-3xl text-center mt-2">
                  {t("About.Title")}
                </h1>
              </strong>
              <section className="flex flex-row justify-start items-center p-2 m-1 h-[50%] w-[100%]">
                <article className="flex flex-col justify-start items-center w-[50%] h-[100%] mt-4">
                  <strong>
                    <h3 className=" font-ojuju text-xl text-center mt-2">
                      {t("About.DescriptionTitle")}
                    </h3>
                  </strong>
                  <p className="text-lg text-justify font-ojujuLight">
                    {t("About.Description.p1")}
                  </p>
                  <p className="text-lg text-justify font-ojujuLight">
                    {t("About.Description.p2")}
                  </p>
                  <p className="text-lg text-justify font-ojujuLight">
                    {t("About.Description.p3")}
                  </p>
                </article>
                <article className="flex flex-col justify-start items-center w-[50%] h-[100%] text-justify font-ojujuLight text-lg mt-4">
                  <strong>
                    <h3 className=" font-ojuju text-xl text-center mt-2">
                      {t("About.HobbiesTitle")}
                    </h3>
                  </strong>

                  <div className="flex flex-col w-[100%] h-[100%] justify-start items-center gap-2">
                    {Object.keys(HOBBIES_DICTIONARY).map((hobbie, idx) => {
                      return (
                        <div
                          className={"w-[60%] h-[100%] flex flex-row gap-0 p-2 bg-blue-chill-800 text-blue-chill-200 justify-evenly items-center rounded-lg"}
                          key={idx}
                        >
                          <SingleHobby hobby={HOBBIES_DICTIONARY[hobbie]} />
                        </div>
                      );
                    })}
                  </div>
                </article>
              </section>
            </>
          );
        }

        `,
        explanation: "Projects.ProjectList.2.codes.0.explanation",
        name: "Projects.ProjectList.2.codes.0.name",
      },
      1: {
        code: `
        "use client";

        import { useState } from "react";
        import Image from "next/image";
        import { useTranslation } from "react-i18next";
        import i18n from "@/i18n/index";

        export default function Navbar(props) {
          const [currentLanguage, setCurrentLanguage] = useState(
            localStorage.getItem("lang")
          );
          const { t } = useTranslation();
          const { handler } = props;
          const [flag, setFlag] = useState(currentLanguage);

          const handleFlagClick = (e) => {
            e.preventDefault();
            const newLanguage = currentLanguage === "eng" ? "spa" : "eng";
            i18n.changeLanguage(newLanguage);
            setCurrentLanguage(newLanguage);
            localStorage.setItem("lang", newLanguage);
            setFlag(newLanguage);
          };

          return (
            <div
              className={"flex flex-col justify-center items-center p-2 w-[80%] h-[10vh] mb-2 font-ojuju text-xl"}
            >
              <div className="flex flex-col md:flex-row justify-center items-center w-[100%]">
                <button onClick={handleFlagClick} className="w-fit h-fit">
                  <Image
                    src={"/"+flag+".svg"}
                    width={60}
                    height={60}
                    alt={flag === "spa" ? "Español" : "English"}
                    title={t("Navbar.FlagTitle."+flag})}
                    className="hover:scale-105 p-2 items-center"
                  />
                </button>
                <ul className={"flex flex-row justify-between items-center gap-10"}>
                  <li
                    onClick={(e) => {
                      handler(1);
                    }}
                    className={"cursor-pointer hover:scale-110"}
                  >
                    {t("Navbar.Main")}
                  </li>
                  <li
                    onClick={(e) => {
                      handler(2);
                    }}
                    className="cursor-pointer hover:scale-110"
                  >
                    {t("Navbar.About")}
                  </li>
                  <li
                    onClick={(e) => {
                      handler(3);
                    }}
                    className="cursor-pointer hover:scale-110"
                  >
                    {t("Navbar.Skills")}
                  </li>
                  <li
                    onClick={(e) => {
                      handler(4);
                    }}
                    className="cursor-pointer hover:scale-110"
                  >
                    {t("Navbar.Projects")}
                  </li>
                  <li
                    onClick={(e) => {
                      handler(5);
                    }}
                    className="cursor-pointer hover:scale-110"
                  >
                    {t("Navbar.Contact")}
                  </li>
                </ul>
              </div>
            </div>
          );
        }
        `,
        explanation: "Projects.ProjectList.2.codes.1.explanation",
        name: "Projects.ProjectList.2.codes.1.name",
      },
      2: {
        code: `
        // StackList.jsx
        "use client";

        import { useState } from "react";
        import SingleTech from "./SingleTech";

        export default function StackList(props) {
          const { stack } = props;
          const [switchLetter, setSwitchLetter] = useState("");

          const handleReturnToStack = (e) => {
            e.preventDefault();
            setSwitchLetter("");
          };

          const handleLetterEvent = (e) => {
            e.preventDefault();
            const letter = e.target.getAttribute("data-letter");

            if (switchLetter.letter === letter) {
              setSwitchLetter("");
            } else {
              setSwitchLetter(letter);
            }
          };

          return (
            <>
              {switchLetter === "" && (
                <>
                  {Object.keys(stack).map((letter) => {
                    return (
                      <button
                        key={stack[letter].main}
                        className="w-[15%] text-center border border-blue-chill-100/15 rounded-md hover:scale-105 hover:text-blue-chill-50"
                        onClick={handleLetterEvent}
                        data-letter={stack[letter].main}
                      >
                        {stack[letter].main}
                      </button>
                    );
                  })}
                </>
              )}

              {switchLetter !== "" && (
                <SingleTech
                  letter={stack[switchLetter]}
                  returner={handleReturnToStack}
                />
              )}
            </>
          );
        }

        // SingleTech.jsx
        "use client";

        import Image from "next/image";
        import { useTranslation } from "react-i18next";

        export default function SingleTech(props) {
          const { letter, returner } = props;
          const { t } = useTranslation();

          return (
            <>
              <div className="flex flex-col justify-center items-center text-blue-chill-50">
                <button
                  onClick={returner}
                  className="flex flex-col justify-center items-center"
                >
                  <Image
                    src={"/logos/"+letter.main+".png"}
                    width={40}
                    height={40}
                    alt={letter.name}
                    title={letter.name}
                    className="bg-white/5"
                  />
                  <h3 className="text-center text-blue-chill-800">{letter.name}</h3>
                  <h5 className="text-center text-lg">{t("Main."+letter.side)}</h5>
                </button>

                <p className="text-justify text-lg font-ojujuLight">
                  {t("Main."+letter.main)}
                </p>
              </div>
            </>
          );
        }
        `,
        explanation: "Projects.ProjectList.2.codes.2.explanation",
        name: "Projects.ProjectList.2.codes.2.name",
      },
    },
    state: "Projects.States.finished",
    tecnos: [
      mainStackDictionary["R"],
      OtherTechsDictionary["NJS"],
      OtherTechsDictionary["TWD"],
    ],
  },
};
