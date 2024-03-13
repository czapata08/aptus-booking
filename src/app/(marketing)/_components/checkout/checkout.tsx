import { CheckoutForm as StripeCheckout } from "@/app/_payments/e-checkout-form"
import {
  CheckoutForm,
  InviteAFriendForm,
} from "@/app/(dashboard)/_forms/checkout-form"

import { FormWizardProvider } from "../form-wizard/f-wizard-reducer"
import {
  CheckoutWizardShell,
  type FormSteps,
} from "../form-wizard/wizard-shell"
import { InsertBookingDetails } from "./form"

const steps: FormSteps[] = [
  {
    id: "1",
    title: "Event",
    formComponent: <CheckoutForm slotId="33" ticketId="33" ticketAmount="2" />,
    formIndex: 1,
  },
  {
    id: "2",
    title: "Tickets",
    formComponent: <InsertBookingDetails bookingId="999" />,
    formIndex: 2,
  },
  {
    id: "3",
    title: "Checkout",
    formComponent: <InviteAFriendForm slotId="33" />,
    formIndex: 3,
  },
  {
    id: "4",
    title: "Payment",
    formComponent: <StripeCheckout uiMode="embedded" />,
    formIndex: 4,
  },
]

export function CheckoutWizardDemo() {
  return (
    <FormWizardProvider
      initialStateProps={{ totalSteps: Number(steps.length), initialStep: 1 }}
    >
      <CheckoutWizardShell steps={steps} />
    </FormWizardProvider>
  )
}
