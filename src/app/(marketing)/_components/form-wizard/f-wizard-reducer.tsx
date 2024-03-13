"use client"

import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react"

interface FormWizardProps {
  totalSteps: number
  initialStep: number
  currentStep: number
  errorState: string | null
  successState: string | null
  isLoading: boolean
  isCompleted: boolean
  onLocalStorage?: boolean
}

const initialStateDefault: FormWizardProps = {
  totalSteps: 0,
  initialStep: 0,
  currentStep: 0,
  errorState: null,
  successState: null,
  isLoading: false,
  isCompleted: false,
}

type FormAction =
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "RESET" }
  | { type: "ERROR"; payload: string }
  | { type: "SUCCESS"; payload: string }
  | { type: "LOADING" }
  | { type: "COMPLETED" }
  | { type: "CURRENT_STEP"; payload: number }
  | { type: "LOCAL_STORAGE" }

function reducer(state: FormWizardProps, action: FormAction): FormWizardProps {
  switch (action.type) {
    case "NEXT_STEP":
      return {
        ...state,
        currentStep: state.currentStep + 1,
      }
    case "PREV_STEP":
      return {
        ...state,
        currentStep: state.currentStep - 1,
      }
    case "RESET":
      return {
        ...state,
        currentStep: state.initialStep,
        errorState: null,
        successState: null,
        isLoading: false,
        isCompleted: false,
      }
    case "ERROR":
      return {
        ...state,
        errorState: action.payload,
        isLoading: false,
      }
    case "SUCCESS":
      return {
        ...state,
        successState: action.payload,
        isLoading: false,
      }
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      }
    case "COMPLETED":
      return {
        ...state,
        isCompleted: true,
      }
    case "CURRENT_STEP":
      return {
        ...state,
        currentStep: action.payload,
      }
    case "LOCAL_STORAGE":
      return {
        ...state,
        onLocalStorage: true,
      }
    default:
      return state
  }
}

type SetStateProps = Pick<FormWizardProps, "totalSteps" | "initialStep">

function setInitialState(initialState: SetStateProps) {
  return {
    ...initialStateDefault,
    totalSteps: initialState.totalSteps,
    initialStep: initialState.initialStep,
  } as FormWizardProps
}

const FormWizardContext = createContext<{
  wState: FormWizardProps
  wDispatch: React.Dispatch<FormAction>
}>({
  wState: initialStateDefault,
  wDispatch: () => undefined,
})

export const FormWizardProvider = ({
  children,
  initialStateProps,
}: {
  children: ReactNode
  initialStateProps: Partial<FormWizardProps>
}) => {
  const [wState, wDispatch] = useReducer(
    reducer,
    {
      ...initialStateDefault,
      ...initialStateProps,
    },
    setInitialState
  )

  return (
    <FormWizardContext.Provider value={{ wState, wDispatch }}>
      {children}
    </FormWizardContext.Provider>
  )
}

export const useFormWizard = () => {
  const context = useContext(FormWizardContext)
  if (context === undefined) {
    throw new Error("useFormWizard must be used within a FormWizardProvider")
  }
  return context
}
