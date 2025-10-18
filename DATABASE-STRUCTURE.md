# Al-Radwan Academy Database Documentation

## Database Structure Overview

This document explains the database collections used by Al-Radwan Academy's management system and provides examples of API queries for the dashboard functionality.

## Core Collections

### 1. users

**Purpose**: Central user management for all system roles
**Fields**:

- `id`: Unique identifier
- `phone_number1`, `phone_number2`: Contact numbers
- `email`: Email address
- `first_name`, `last_name`: Personal names
- `role`: User type ('parent', 'student', 'instructor', 'admin', 'superadmin')
- `national_id`, `address`: Optional personal information

**Example Query**: `GET /users?role=instructor`

### 2. parents

**Purpose**: Links users with parent role to their specific parent data
**Fields**:

- `id`: Unique parent identifier
- `user_id`: Reference to users table

**Example Query**: `GET /parents/p1?_expand=user`

### 3. children

**Purpose**: Child records managed by parents
**Fields**:

- `id`: Unique child identifier
- `parent_id`: Reference to parents table
- `first_name`, `last_name`: Child's name
- `dob`: Date of birth
- `unique_code`: Student identification code
- `photo_url`: Profile picture
- `status`: 'active', 'inactive', 'graduated'

**Example Query**: `GET /children?parent_id=p1`

### 4. student_users

**Purpose**: Links users with student role (age 15+) to their academic data
**Fields**:

- `id`: Unique student identifier
- `user_id`: Reference to users table
- `unique_code`: Student identification code

**Example Query**: `GET /student_users?user_id=u3`

### 5. instructors

**Purpose**: Teacher/instructor profiles and employment data
**Fields**:

- `id`: Unique instructor identifier
- `user_id`: Reference to users table
- `bio`: Professional biography
- `monthly_salary`: Compensation amount
- `hire_date`: Employment start date
- `avg_rating`: Cached average from student ratings

**Example Query**: `GET /instructors?user_id=u1&_expand=user`

## Academic Collections

### 6. seasons

**Purpose**: Academic terms and program periods
**Fields**:

- `id`: Unique season identifier
- `name`: Season name (e.g., "Winter Term 2025")
- `season_type`: 'summer_camp', 'school', 'ramadan', 'eid', 'other'
- `start_date`, `end_date`: Period dates
- `is_active`: Current status

**Example Query**: `GET /seasons?is_active=true`

### 7. courses

**Purpose**: Educational programs and classes
**Fields**:

- `id`: Unique course identifier
- `name`: Course title
- `description`: Course details
- `season_id`: Reference to seasons table
- `instructor_id`: Reference to instructors table
- `start_date`, `end_date`: Course duration
- `num_lectures`: Total lecture count
- `capacity`: Maximum enrollment
- `price`: Course fee
- `enrolled_count`: Current enrollments
- `thumbnail`: Course image
- `tags`: Subject categories

**Example Query**: `GET /courses?instructor_id=ins1&is_active=true`

### 8. lectures

**Purpose**: Individual class sessions
**Fields**:

- `id`: Unique lecture identifier
- `course_id`: Reference to courses table
- `scheduled_at`: Date and time
- `lecture_number`: Sequence number
- `instructor_id`: Reference to instructors table (can override course instructor)
- `status`: 'scheduled', 'completed', 'cancelled'

**Example Query**: `GET /lectures?course_id=1&status=scheduled&_sort=scheduled_at`

## Enrollment & Attendance Collections

### 9. enrollments

**Purpose**: Student registrations in courses
**Fields**:

- `id`: Unique enrollment identifier
- `course_id`: Reference to courses table
- `student_id`: Reference to student_users table (for 15+ students)
- `child_id`: Reference to children table (for younger students)
- `enrolled_at`: Registration timestamp
- `active`: Current enrollment status
- `status`: 'active', 'completed', 'dropped', 'suspended'
- `created_by`: Admin who approved enrollment

**Example Query**: `GET /enrollments?student_id=s1&active=true&_expand=course`

## Dashboard API Patterns

### Student Dashboard Queries

```
GET /student_users/s1?_expand=user
GET /enrollments?student_id=s1&_expand=course
GET /exam_results?student_id=s1&_expand=exam
GET /lecture_attendances?student_id=s1&_expand=lecture
GET /lectures?course_id=1&status=scheduled&_sort=scheduled_at&_limit=5
```

### Instructor Dashboard Queries

```
GET /instructors/ins1?_expand=user
GET /courses?instructor_id=ins1&is_active=true
GET /lectures?course_id=1&_sort=scheduled_at&_order=desc
GET /lecture_attendances?lecture_id=lec1
```

### Parent Dashboard Queries

```
GET /parents/p1?_expand=user
GET /children?parent_id=p1
GET /enrollments?child_id=c1&_expand=course
GET /payments?payer_parent_id=p1
GET /pending_enrollments?parent_id=p1&_expand=course
```
