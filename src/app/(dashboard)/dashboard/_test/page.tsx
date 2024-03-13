import { HandlePartySize, HandleStep } from "../../_forms/f-wizard"

export default function FormWizardPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: Record<string, string | string[] | undefined>
}) {
  const currentStep = Number(searchParams.wStep)
  const currentPartySize = Number(searchParams.partySize)

  // Determine which form to display based on the current step
  let FormComponent
  switch (currentStep) {
    case 1:
      FormComponent = Step1Form
      break
    case 2:
      FormComponent = Step2Form
      break
    case 3:
      FormComponent = Step3Form
      break
    case 4:
      FormComponent = Step4Form
      break
    default:
      FormComponent = Step1Form
  }

  // let PartySize
  // switch (currentPartySize) {
  //   case 1:
  //     PartySize = PartySizeCounter
  //     break
  //   default:
  //     PartySize = PartySizeCounter
  // }

  return (
    <div className="flex justify-center items-center border h-full bg-slate-600">
      <>
        <FormComponent />
        {/* <div className="flex justify-between mt-4 gap-2">
          <HandleStep useCase="prev" />
          <HandleStep useCase="next" />
          
        </div> */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-lg font-medium">Party size</p>
          <div className="flex items-center">
            <HandlePartySize useCase="minus" />
            <p className="mx-4">{currentPartySize} ticket</p>
            <HandlePartySize useCase="plus" />
          </div>
        </div>
      </>
    </div>
  )
}

// Step1Form.js
const Step1Form = () => (
  <div>
    <h2>Step 1: Personal Information</h2>
    <p>Form content here...</p>
    {/* Form fields for step 1 */}
    <input type="text" placeholder="First Name" />
    <input type="text" placeholder="Last Name" />
    <input type="email" placeholder="Email" />
  </div>
)

// Step2Form.js
const Step2Form = () => (
  <div>
    <h2>Step 2: Contact Details</h2>
    <p>Form content here...</p>
    {/* Form fields for step 2 */}
    <input type="text" placeholder="Address" />
    <input type="text" placeholder="City" />
    <input type="text" placeholder="State" />
    <input type="text" placeholder="Zip Code" />
  </div>
)

// Step3Form.js
const Step3Form = () => (
  <div>
    <h2>Step 3: Education Background</h2>
    <p>Form content here...</p>
    {/* Form fields for step 3 */}
    <input type="text" placeholder="University" />
    <input type="text" placeholder="Degree" />
    <input type="text" placeholder="Major" />
    <input type="text" placeholder="Graduation Year" />
  </div>
)

// Step4Form.js
const Step4Form = () => (
  <div>
    <h2>Step 4: Work Experience</h2>
    <p>Form content here...</p>
    {/* Form fields for step 4 */}
    <input type="text" placeholder="Company" />
    <input type="text" placeholder="Position" />
    <input type="text" placeholder="Start Date" />
    <input type="text" placeholder="End Date" />
  </div>
)
