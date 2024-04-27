package com.issue_tracker.issur_tracker.config;

import com.issue_tracker.issur_tracker.Entity.User;
import com.issue_tracker.issur_tracker.model.Handler;
import com.issue_tracker.issur_tracker.model.Issue;
import com.issue_tracker.issur_tracker.repository.HandlerRepository;
import com.issue_tracker.issur_tracker.repository.IssueRepository;
import com.issue_tracker.issur_tracker.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;

@Configuration // this is used to add values to DB
public class StudentConfig {
    @Bean
    CommandLineRunner commandLineRunner(IssueRepository repository) {
        return args -> {

            Issue umaya = new Issue(
                    "umaya@gmail.com",
                    "Isuru's Subject",
                    "This is the description",
                    "Jane Smith",
                    LocalDateTime.of(2024, Month.MARCH, 22, 0, 0),
                    LocalDateTime.of(2024, Month.MARCH, 22, 0, 0),
                    1
            );

            Issue anotherIssue = new Issue(
                    "another@gmail.com",
                    "Another Subject",
                    "Another description",
                    "John Doe",
                    LocalDateTime.of(2024, Month.APRIL, 10, 0, 0),
                    LocalDateTime.of(2024, Month.APRIL, 15, 0, 0),
                    0
            );

            Issue thirdIssue = new Issue(
                    "third@gmail.com",
                    "Third Subject",
                    "Third description",
                    "Alice Johnson",
                    LocalDateTime.of(2024, Month.MAY, 5, 0, 0),
                    LocalDateTime.of(2024, Month.MAY, 10, 0, 0),
                    2
            );

            repository.saveAll(List.of(umaya, anotherIssue, thirdIssue));
        };

    }
    @Bean
    CommandLineRunner handlerDataLoader(HandlerRepository handlerRepository) {
        return args -> {
            Handler handler1 = new Handler(
                    "John Doe",
                    "john.doe@example.com",
                    "$2a$10$8jZ1rS9IYqgmYPLGueqdZutYELPA1Tlu2AJ2tXd6e9gZILZu2A4wa",
                    "Developer",
"https://firebasestorage.googleapis.com/v0/b/issue-tracker-9b307.appspot.com/o/OIP%20(1).jpeg?alt=media&token=751e4769-576a-4ef8-b694-ea6cb88ab855"
            );

            Handler handler2 = new Handler(
                    "Jane Smith",
                    "jane.smith@example.com",
                    "$2a$10$wm3I1fT.eYYsyfvPVVEiHu1YZtqU2njI3EUwnbzQXg8mGjJq5eaN2",
                    "Analyst",
                    "https://firebasestorage.googleapis.com/v0/b/issue-tracker-9b307.appspot.com/o/OIP%20(1).jpeg?alt=media&token=751e4769-576a-4ef8-b694-ea6cb88ab855"

            );

            Handler handler3 = new Handler(
                    "Michael Johnson",
                    "michael.johnson@example.com",
                    "$2a$10$wm3I1fT.eYYsyfvPVVEiHu1YZtqU2njI3EUwnbzQXg8mGjJq5eaN2",
                    "UI/UX Designer",
                    "https://firebasestorage.googleapis.com/v0/b/issue-tracker-9b307.appspot.com/o/Andy_Anderson_team_page_22.jpeg?alt=media&token=443e459b-3a84-4a87-82b5-091a7d5acf10"
            );

            handlerRepository.saveAll(List.of(handler1, handler2, handler3));
        };
    }

//    @Bean
//    CommandLineRunner handleUserData(UserRepository userRepository){
////        return args -> {
////            User tony = new User(
////                    "Tony",
////                    "tony@gmail.com",
////                    "1234",
////                    "isuru"
////            );
////        };
//    }

//    @Bean
//    public BCryptPasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }

}
