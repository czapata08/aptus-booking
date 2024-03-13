"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useFormWizard } from "./f-wizard-reducer"

export interface FormSteps {
  id: string
  title: string
  formComponent: React.ReactNode
  formIndex: number
}

const WizardFormStep: React.FC<FormSteps> = ({ formComponent, formIndex }) => {
  const { wState } = useFormWizard()
  //delta is used to determine the direction of the animation wether forward or backward
  const delta = wState.currentStep - (formIndex - 1)

  return wState.currentStep === formIndex ? (
    <motion.div
      initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {formComponent}
    </motion.div>
  ) : null
}

export function CheckoutWizardShell({ steps }: { steps: FormSteps[] }) {
  const { wState, wDispatch } = useFormWizard()

  const goToNextStep = () => wDispatch({ type: "NEXT_STEP" })
  const goToPreviousStep = () => wDispatch({ type: "PREV_STEP" })
  // const resetWizard = () => wDispatch({ type: "RESET" })

  //Dynamicall generate wizardSteps base on totalSteps
  const wizardSteps = steps.map((step, index) => (
    <WizardFormStep
      key={step.id}
      formComponent={step.formComponent}
      formIndex={index}
      id={step.id}
      title={step.title}
    />
  ))

  return (
    <section className="flex flex-col justify-between container">
      {/* steps */}
      <nav aria-label="Progress">
        <ol
          role="list"
          className="flex justify-evenly md:flex md:space-x-8 md:space-y-0"
        >
          {steps.map((step, index) => (
            <li key={step.title} className="md:flex-1">
              {wState.currentStep > index ? (
                <div className="group flex w-full flex-col border-t-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-600 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
              ) : wState.currentStep === index ? (
                <div
                  className="flex w-full flex-col border-t-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-sky-600">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-t-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-8 pt-5 h-[70dvh] overflow-auto" id="wizardBody">
        {/* Wizard Steps */}
        {wizardSteps}

        {/*On Complete Success Step  */}
        {wState.currentStep === wState.totalSteps && (
          <>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Complete
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Thank you for your submission.
            </p>
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 pb-3">
        <div className="flex justify-between w-full items-center">
          <Button
            onClick={goToPreviousStep}
            disabled={wState.currentStep === 0 ?? 1}
            variant="outline"
            size="sm"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={goToNextStep}
            disabled={wState.currentStep === wState.totalSteps}
            variant="outline"
            size="sm"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          {/* <button onClick={resetWizard}>Reset</button> */}
        </div>
      </div>
    </section>
  )
}
