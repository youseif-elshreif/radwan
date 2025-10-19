# API Directory

هذا المجلد يحتوي على جميع طبقة الـ API المنظمة بشكل حديث ومنطقي:

## البنية

### `client.ts`

- إعداد axios client مع interceptors متقدمة
- معالجة التوكن والـ refresh token تلقائياً
- معالجة الأخطاء والـ 401 responses
- Base URL configuration

### API Modules

#### `auth.ts`

```typescript
authApi.loginStudentOrParent(credentials);
authApi.loginInstructor(credentials);
```

#### `courses.ts`

```typescript
coursesApi.getFeaturedCourses()
coursesApi.getCourses(filters?)
coursesApi.getCourseById(id)
coursesApi.getCoursesByCategory(category)
coursesApi.getCategories()
coursesApi.getSeasons()
coursesApi.getTags()
coursesApi.getInstructors()
```

#### `dashboard.ts`

```typescript
dashboardApi.getStudentDashboard(studentId);
dashboardApi.getInstructorDashboard(instructorId);
dashboardApi.getParentDashboard(parentId);
```

#### `stats.ts`

```typescript
statsApi.getStats();
```

#### `testimonials.ts`

```typescript
testimonialsApi.getTestimonials();
```

#### `users.ts`

```typescript
usersApi.postLectureAttendance(lectureId, payload);
usersApi.getPaymentsByParent(parentId);
usersApi.getUserWithRole(userId);
```

#### `utils.ts`

```typescript
utilsApi.calculateAge(dob);
```

### `index.ts`

ملف التجميع الذي يصدر جميع الـ APIs للاستخدام السهل.

## طرق الاستخدام

### الطريقة الحديثة (مفضلة):

```typescript
import { authApi } from "@/api/auth";
import { coursesApi } from "@/api/courses";
import { dashboardApi } from "@/api/dashboard";

const response = await authApi.loginStudentOrParent(credentials);
const courses = await coursesApi.getFeaturedCourses();
const dashboard = await dashboardApi.getStudentDashboard(studentId);
```

### للتوافق مع الكود القديم (مؤقتة):

```typescript
import {
  loginStudentOrParent,
  getFeaturedCourses,
  getStudentDashboard,
} from "@/api";
```

## مميزات البنية الجديدة

✅ **منظمة**: كل domain له ملف منفصل  
✅ **قابلة للتوسع**: سهولة إضافة APIs جديدة  
✅ **Type Safe**: جميع الدوال لها types محددة  
✅ **أداء أفضل**: interceptors متقدمة لمعالجة الأخطاء  
✅ **سهولة الصيانة**: كود نظيف ومنظم  
✅ **توافق عكسي**: يدعم الكود القديم مؤقتاً
