package com.issue_tracker.issur_tracker.controller;
//THIS IS THE API LAYER

//THIS WILL HAVE ALL OF THE RESOURCES FOR THE API,
//THE RESTCONTROLLER ANNOTATION MUST BE HERE

import com.issue_tracker.issur_tracker.service.IssueService;
import com.issue_tracker.issur_tracker.model.Issue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController // makes the class serve rest endpoints (GET,POSt and such)
@RequestMapping("api/v1/issue")
public class IssueController {

    private final IssueService issueService;

    @Autowired
    public IssueController(IssueService issueService) {
        this.issueService = issueService; // instead of this we can use dependency injection to solve
        // the issues so we use @AutoWired Annoatation to magically instantiate

    }

    @GetMapping // GET I CAN ADD ANY ENDPOINT FOR THIS IN A VRACKER LIKE GetMapping("/greets")
    // HERE WELL BE stuff FROM THE IssueService
    public List<Issue> getIssue() {
        return issueService.getIssue();
    }

    @PostMapping
    public void registerNewIssue(@RequestBody Issue issue) {
        issueService.addNewIssue(issue);
    }

    @DeleteMapping(path = "{issueId}")
    public void deleteIssue(@PathVariable("issueId") Long issueId) {
        issueService.deleteIssue(issueId);
    }

    @PutMapping(path = "{issueId}")
    public void updateIssue(
            @PathVariable("issueId") Long issueId,
            @RequestParam(required = true) String technician,
            @RequestParam(required = false) LocalDateTime issueAssigned){
        System.out.println("Controller " + technician);
        issueService.updateIssue(issueId, technician, issueAssigned);
    }

}
