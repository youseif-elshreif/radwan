# Mock API Database Explanation

## Purpose

This `db.json` file serves as a mock backend for Al-Radwan Academy frontend development. It allows the UI to be developed and tested independently of the real backend implementation.

## Why Each Collection Exists

### **courses**

- **Purpose**: Frontend needs course samples to render FeaturedCourses and CourseCard components
- **Fields Include**:
  - `id`, `name`, `description`: Basic course information
  - `thumbnail`: Path to course image in `/public/imgs/`
  - `tags`: Array of category tags for filtering and badges
  - `start_date`, `end_date`: Course scheduling information
  - `price`, `capacity`, `enrolled_count`: Pricing and availability data
  - `instructor_id`: Links to instructor data
  - `featured`: Boolean to mark courses as featured on homepage
- **Usage**: Used by SearchFilters, FeaturedCourses, and CourseCard components

### **instructors**

- **Purpose**: Provides instructor names and bio information for course cards
- **Fields Include**: `id`, `user_id`, `first_name`, `last_name`, `bio`
- **Usage**: Referenced by courses to display instructor information

### **tags**

- **Purpose**: Category names used for course filtering and badge display
- **Fields Include**: `id`, `name`
- **Usage**: Used in SearchFilters component for category selection and CourseCard for badges

### **seasons**

- **Purpose**: Populates season filter dropdown and shows season labels on courses
- **Fields Include**: `id`, `name`, `season_type`, `start_date`, `end_date`
- **Usage**: Used in SearchFilters component season dropdown

### **testimonials**

- **Purpose**: Provides customer reviews for the Testimonials component
- **Fields Include**: `id`, `name`, `role`, `quote`, `rating`
- **Usage**: Displays customer feedback on homepage

### **stats**

- **Purpose**: Aggregated numbers for StatusCounters component
- **Fields Include**: `students`, `active_courses`, `seasons_completed`
- **Usage**: Shows academy achievements in numbers on homepage

### **users** (minimal)

- **Purpose**: Sample user data to maintain consistency with future auth endpoints
- **Fields Include**: Basic user structure matching backend schema
- **Usage**: Not used in current UI but maintains API contract

### **children/pending_enrollments** (optional)

- **Purpose**: Empty arrays or single samples to show data structure
- **Usage**: Not used in current UI but useful for future development

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
