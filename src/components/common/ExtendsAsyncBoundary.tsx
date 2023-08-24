import AsyncBoundary from "./AsyncBoundary";

// function isExpectedError<T>(res: unknown): res is ExpectedError {
//   if (typeof res !== 'object' || res == null) {
//     return false
//   }

//   return res.expected
//   // or return res.errorCode != null
// }

// export default function ExtendsAsyncBoundary({
//   pendingFallback = defaultPendingFallback,
//   rejectedFallback = defaultRejectedFallback,
//   ...props
// }: Props) {
//   return (
//     <AsyncBoundary
//       pendingFallback={pendingFallback}
//       rejectedFallback={({ error, reset }) => {
//         if (isExpectedError(error)) {
//           return rejectedFallback({ error, reset })
//         }
//         Sentry.captureError(error)
//       }}
//       {...props}
//     />
//   )
// }
