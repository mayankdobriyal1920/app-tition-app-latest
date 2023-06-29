RUN `npm i` to install node module
RUN `npm start` to start server
RUN `nohup npm start` to build server parmanently

68.178.168.176
/var/www/vhosts/121tuition.in/httpdocs/tuition
root
Pa$$W0rd


68.178.174.134
root
Pa$$W0rd
/var/www/vhosts/121tuition.in/httpdocs/tuition


select profile_subject_with_batch.id                              as profile_subject_with_batch_id,
                   profile_subject_with_batch.batch                           as profile_subject_with_batch_batch_type,
                   profile_subject_with_batch.has_taken_demo                  as profile_subject_with_batch_has_taken_demo,
                   profile_subject_with_batch.class_assigned_teacher_batch_id as class_assigned_teacher_batch_id,
                   class_assigned_teacher_batch.is_demo_class                 as is_demo_class,
                   class_assigned_teacher_batch.class_batch_name              as class_batch_name,
                   class_assigned_teacher_batch.teacher_id              as teacher_id,
                   student_profile.id                                         as student_id,
                   student_profile.name                                       as student_name,
                   student_profile.email                                      as student_email,
                   subject.id                                                 as subject_id,
                   subject.name                                               as subject_name,
                   school_board.name                                          as school_board_name,
                   school_board.id                                            as school_board_id,
                   class_timetable_with_class_batch_assigned.jsdata           as class_timetable_with_class_batch_assigned,
                   student_profile.student_class                              as student_class

            from profile_subject_with_batch
                     join student_profile on profile_subject_with_batch.profile_id = student_profile.id
                     left join class_assigned_teacher_batch on profile_subject_with_batch.class_assigned_teacher_batch_id =
                                                          class_assigned_teacher_batch.id
                     left join (SELECT class_assigned_teacher_batch_id,
                                       JSON_ARRAYAGG(
                                               json_object(
                                                       'start_from_date_time',
                                                       class_timetable_with_class_batch_assigned.start_from_date_time,
                                                       'id', class_timetable_with_class_batch_assigned.id,
                                                       'class_end_date_time',
                                                       class_timetable_with_class_batch_assigned.class_end_date_time
                                                   )
                                           ) jsdata
                                FROM class_timetable_with_class_batch_assigned
                                WHERE DATE (start_from_date_time) >= '2023-06-25' AND DATE(start_from_date_time) <='2023-07-01'GROUP BY class_assigned_teacher_batch_id)class_timetable_with_class_batch_assigned on class_assigned_teacher_batch.id=class_timetable_with_class_batch_assigned.class_assigned_teacher_batch_id join school_board on student_profile.school_board=school_board.id join subject on subject.id=profile_subject_with_batch.subject_id WHERE profile_subject_with_batch.has_taken_demo=1
