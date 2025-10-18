# Al-Radwan Academy Database Documentation

## Purpose

This `db.json` file serves as a comprehensive mock backend for Al-Radwan Academy's complete system including homepage, authentication, and dashboard functionality. It allows full-stack development and testing independently of the real backend implementation.

## Core Collections for User Management

### **users**

- **Purpose**: Central user management for all system roles (students, parents, instructors, admin)
- **Fields Include**:
  - `id`, `email`, `phone_number1`, `phone_number2`: Contact information
  - `first_name`, `last_name`: Personal names
  - `role`: User type ('parent', 'student', 'instructor', 'admin', 'superadmin')
  - `national_id`, `address`: Optional personal information
- **Usage**: Authentication system, user profile management
- **Dashboard Queries**: `GET /users?role=instructor`, `GET /users/u1`

### **parents**

- **Purpose**: Links users with parent role to their specific parent data
- **Fields Include**: `id`, `user_id`
- **Usage**: Parent dashboard, child management
- **Dashboard Queries**: `GET /parents/p1?_expand=user`

### **children**

- **Purpose**: Child records managed by parents (students under 15)
- **Fields Include**:
  - `id`, `parent_id`: Relationship data
  - `first_name`, `last_name`, `dob`: Personal information
  - `unique_code`: Student identification code
  - `photo_url`, `status`: Profile and status data
- **Usage**: Parent dashboard, enrollment management
- **Dashboard Queries**: `GET /children?parent_id=p1`

### **student_users**

- **Purpose**: Links users with student role (age 15+) to their academic data
- **Fields Include**: `id`, `user_id`, `unique_code`
- **Usage**: Student dashboard, direct student enrollments
- **Dashboard Queries**: `GET /student_users?user_id=u3`

### **instructors**

- **Purpose**: Teacher/instructor profiles and employment data
- **Fields Include**:
  - `id`, `user_id`: Basic identification
  - `bio`: Professional biography
  - `monthly_salary`, `hire_date`: Employment details
  - `avg_rating`: Cached average from student ratings
- **Usage**: Instructor dashboard, course assignment, profile display
- **Dashboard Queries**: `GET /instructors?user_id=u1&_expand=user`

## Academic Collections

### **seasons**

- **Purpose**: Academic terms and program periods
- **Fields Include**:
  - `id`, `name`: Season identification
  - `season_type`: 'summer_camp', 'school', 'ramadan', 'eid', 'other'
  - `start_date`, `end_date`, `is_active`: Period management
- **Usage**: Course scheduling, season filters, academic calendar
- **Dashboard Queries**: `GET /seasons?is_active=true`

### **courses**

- **Purpose**: Educational programs and classes
- **Fields Include**:
  - `id`, `name`, `description`: Basic course information
  - `season_id`, `instructor_id`: Relationship data
  - `start_date`, `end_date`, `num_lectures`: Scheduling
  - `capacity`, `enrolled_count`, `price`: Enrollment management
  - `thumbnail`, `tags`, `featured`: Display and categorization
- **Usage**: Homepage display, course management, enrollment
- **Dashboard Queries**: `GET /courses?instructor_id=ins1&is_active=true`

### **lectures**

- **Purpose**: Individual class sessions within courses
- **Fields Include**:
  - `id`, `course_id`: Basic identification
  - `scheduled_at`, `lecture_number`: Scheduling data
  - `instructor_id`, `status`: Management information
- **Usage**: Schedule management, attendance tracking
- **Dashboard Queries**: `GET /lectures?course_id=1&status=scheduled&_sort=scheduled_at`

## Enrollment & Academic Progress

### **enrollments**

- **Purpose**: Student registrations in courses
- **Fields Include**:
  - `id`, `course_id`: Basic enrollment data
  - `student_id`, `child_id`: Student identification (one of two)
  - `enrolled_at`, `active`, `status`: Enrollment management
  - `created_by`: Administrative tracking
- **Usage**: Student/parent dashboards, course management
- **Dashboard Queries**: `GET /enrollments?student_id=s1&active=true&_expand=course`

### **lecture_attendances**

- **Purpose**: Track student attendance for each lecture
- **Fields Include**: `id`, `lecture_id`, `student_id`, `child_id`, `status`, `notes`
- **Usage**: Attendance tracking, progress monitoring
- **Dashboard Queries**: `GET /lecture_attendances?student_id=s1&_expand=lecture`

### **exams**

- **Purpose**: Assessment and testing information
- **Fields Include**: `id`, `course_id`, `name`, `date`, `total_marks`, `passing_marks`
- **Usage**: Academic assessment, grade management
- **Dashboard Queries**: `GET /exams?course_id=1`

### **exam_results**

- **Purpose**: Individual student exam scores
- **Fields Include**: `id`, `exam_id`, `student_id`, `child_id`, `marks_obtained`, `grade`
- **Usage**: Student progress tracking, grade reports
- **Dashboard Queries**: `GET /exam_results?student_id=s1&_expand=exam`

## Financial Collections

### **payments**

- **Purpose**: Track all financial transactions
- **Fields Include**:
  - `id`, `enrollment_id`: Transaction identification
  - `amount`, `payment_date`, `status`: Payment details
  - `payer_parent_id`, `payment_method`: Payer information
- **Usage**: Financial management, parent payment tracking
- **Dashboard Queries**: `GET /payments?payer_parent_id=p1`

### **pending_enrollments**

- **Purpose**: Enrollment requests awaiting approval or payment
- **Fields Include**: `id`, `parent_id`, `child_id`, `course_id`, `status`, `submitted_at`
- **Usage**: Administrative workflow, parent dashboard
- **Dashboard Queries**: `GET /pending_enrollments?parent_id=p1&_expand=course`

## Support Collections

### **tags**

- **Purpose**: Course categorization and filtering
- **Fields Include**: `id`, `name`
- **Usage**: Course filtering, category badges
- **Dashboard Queries**: `GET /tags`

### **testimonials**

- **Purpose**: Customer reviews and feedback
- **Fields Include**: `id`, `name`, `role`, `quote`, `rating`
- **Usage**: Homepage testimonials section
- **Dashboard Queries**: `GET /testimonials?rating=5`

### **stats**

- **Purpose**: Academy-wide statistics and metrics
- **Fields Include**: `students`, `active_courses`, `seasons_completed`
- **Usage**: Homepage statistics, administrative dashboards
- **Dashboard Queries**: `GET /stats`

## Benefits of This Approach

1. **Independent Development**: Frontend can be developed without waiting for backend
2. **Realistic Testing**: UI components work with real JSON data structure
3. **Easy Backend Swap**: Only need to change API baseURL when backend is ready
4. **Consistent API Contract**: Data structure matches expected production schema
5. **Fast Iteration**: json-server provides instant API responses for testing

## Running the Mock API

```bash
npm run json
# Serves api/db.json on http://localhost:4000
# Next.js rewrites /api/* to localhost:4000 automatically
```

The frontend makes requests to `/api/courses`, `/api/testimonials`, etc., which are automatically proxied to json-server during development.
