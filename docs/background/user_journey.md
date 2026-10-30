# User Journey — Home & Daily Collection Status

## Feature
**Home & Daily Collection Status**

## Primary User Goal
Help the resident quickly understand:

- whether there is a collection today
- what waste type is being collected
- when the truck is expected
- whether the truck has started
- how close the truck is
- whether the collection is delayed, cancelled, or completed
- what the next collection is
- what to do if their waste was missed

---

## Journey

| Step | How the user would do it | Why the user would do it | Technical delights to ease pain |
|---|---|---|---|
| **1. Open the app** | The user opens the app and lands directly on the Home screen. | To quickly check whether there is a collection today without navigating through menus. | Keep the user logged in, remember their saved location, and load today’s collection status immediately. |
| **2. See today’s collection status** | The user sees a prominent status card showing whether there is a collection today. | To know immediately whether they need to prepare garbage. | Use a simple status such as **Today**, **No collection today**, **Delayed**, **Completed**, or **Cancelled**. Prioritize the status above all other information. |
| **3. Check the waste type** | The user sees the type of waste being collected today, such as organic, recyclable, or non-recyclable. | To make sure they put out the correct waste and avoid rejection or confusion. | Show clear labels with simple icons and local-language names. Avoid requiring the user to open another screen. |
| **4. Check expected collection time** | The user sees an expected collection window such as **8:30 AM–10:00 AM**. | To know when to prepare and place waste outside instead of waiting for several hours. | Generate the time window from route schedule, historical arrival patterns, traffic, and current route progress. Update it dynamically when conditions change. |
| **5. See whether the truck has started** | The user sees a live operational status such as **Not started**, **Collecting now**, **Approaching your area**, or **Completed nearby**. | To understand whether the planned collection is actually happening. | Connect the status to the crew’s active route rather than relying only on the static schedule. Automatically update without requiring page refresh. |
| **6. Understand how close the truck is** | When relevant, the user sees an indication such as **Truck is 20 minutes away** or **3 areas before yours**. | To decide when to move garbage outside and avoid leaving it exposed for too long. | Use GPS and route progress to provide a simple proximity estimate. Avoid showing overly precise ETAs when confidence is low. |
| **7. Receive an approaching alert** | The user receives a notification shortly before the truck reaches their area. | To avoid missing the collection, especially when they are inside the house or occupied with other tasks. | Trigger notifications based on actual truck proximity rather than a fixed clock time. Allow configurable alerts such as 30 minutes or 15 minutes before arrival. |
| **8. View any delay or schedule change** | If the collection is disrupted, the Home screen clearly changes to show the delay, cancellation, or revised time. | To avoid waiting unnecessarily or placing garbage outside when the truck is not coming. | Automatically detect delays from route progress and supervisor updates. Push the change immediately and show the latest revised expectation. |
| **9. Check whether their area was completed** | After the truck passes, the user sees **Collection completed in your area** with the approximate completion time. | To know whether they have already missed the truck or whether collection is still pending. | Mark an area completed automatically when the crew finishes that route segment. Preserve the completion time for the rest of the day. |
| **10. Take action if collection was missed** | If their garbage was not collected, the user selects **Report missed collection** directly from the Home screen. | To report the problem without searching through another section of the app. | Pre-fill the user’s address, today’s route, collection type, vehicle, and collection time. The user should only need to confirm the issue and optionally add a photo/comment. |
| **11. Check the next collection** | The user sees the next scheduled collection date and waste type below today’s status. | To prepare ahead and avoid having to search the full schedule. | Automatically surface the next relevant collection based on the user’s saved location. Show relative wording such as **Tomorrow** or **Monday**, alongside the exact date. |

---

## Core Experience

The Home screen should let the user understand, within a few seconds:

**Is there a collection today? → What waste? → When? → Where is the truck? → Has it passed? → Is there a problem? → What happens next?**
