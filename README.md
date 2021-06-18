**A server for an online tutoring app.**

This is the server for an online tutoring app that has three categories of users: Admin, tutors and students. A user can register as a student on this platform. Afterwards, they can view all categories they can belong to. They can also view all subjects taught in a category. Other actions they can carry out are outlined further down this page.

A user can also register as a tutor. Afterwards, they can perform actions specific to tutors as outlined below.

The last category of users is the admin. No one can sign up as an admin. Only tutors can become admins.

The users on the platform have different privileges based on their roles as outlined below.



***General: (For Admin, Tutors and Students)***;

1. Admin/Students/Tutors can retrieve a subject in a category
2. Admin/Students/Tutors can retrieve all subjects, by category
3. Admin/Students/Tutors can retrieve all categories
4. Admin/Students/Tutors can search for subjects by name, sorted alphabetically in ascending order.
5. Admin/Students can search for tutors by first name, sorted alphabetically in ascending order.
6. Students/Tutors can sign up.
7. Admin/Students/Tutors can sign in.



***Admin:***

1. Admin can create subjects under 3 categories: primary, JSS, SSS
2. Admin can update a subject in a category 
3. Admin can delete a subject in a category
4. Admin can delete or update a category
5. Admin can retrieve all tutors
6. Admin can get a tutor 
7. Admin can deactivate a tutor 
8. Admin can create lessons
9. Admin can retrieve all lessons
10. Admin can get a lesson 
11. Admin can update a lesson 
12. Admin can delete a lesson 
13. Admin signs up as a tutor but you can make a tutor of your choice an admin by giving them the admin role. Not all tutors must be admin. Just a few.



***Tutors***:

1. Tutors can register to take a subject in a category (POST)
2. Tutors can see all subjects they registered to take (GET)
3. Tutors can update a registered subject (PUT)
4. Tutors can delete a registered subject (DELETE)



***Students:***
1. Students can see all tutors taking a subject in a category
2. Students can book lessons