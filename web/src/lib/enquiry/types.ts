import { TOPICS } from "./schema";

/** Shared between the Server Action and the client form. No server imports. */

export type EnquiryField = "name" | "phone" | "email" | "topic" | "details";

export type EnquiryValues = Record<EnquiryField, string>;

export interface EnquiryState {
  errors: Partial<Record<EnquiryField, string>>;
  /**
   * Echoed back so a failed submit does not lose what the visitor typed —
   * the job $_SESSION['form_old'] did in the PHP.
   */
  values: EnquiryValues;
  /**
   * Bumped on every failed submit. React 19 resets uncontrolled fields once a
   * <form action> completes, so the form is keyed on this to force a remount
   * and let `defaultValue` re-apply. Without it, a validation failure would
   * clear the form — worse than the PHP round trip it replaces.
   */
  formKey: number;
}

export const EMPTY_STATE: EnquiryState = {
  errors: {},
  values: { name: "", phone: "", email: "", topic: TOPICS[0], details: "" },
  formKey: 0,
};
