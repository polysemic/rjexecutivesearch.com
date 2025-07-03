<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = trim($_POST['name']);
    $contact_info = trim($_POST['contact_info']);
    $message = trim($_POST['message']);
    $honeypot = $_POST['honeypot'] ?? '';
    
    // Basic validation
    $errors = [];
    
    if (empty($name)) {
        $errors[] = "Full name is required";
    }
    
    if (empty($contact_info)) {
        $errors[] = "Phone number or email is required";
    }
    
    if (empty($message)) {
        $errors[] = "Your question is required";
    }
    
    // Check honeypot (spam protection)
    if (!empty($honeypot)) {
        $errors[] = "Spam detected";
    }
    
    if (empty($errors)) {
        // Email settings
        $to = "ericchaffey@gmail.com";
        $client = "ericchaffey@gmail.com"; // <-- Replace with actual client email
        $subject = "Contact Form Submission from " . $name;
        
        $email_body = "New contact form submission:\n\n";
        $email_body .= "Name: " . $name . "\n";
        $email_body .= "Contact Info: " . $contact_info . "\n";
        $email_body .= "Message: " . $message . "\n";
        $email_body .= "Submitted: " . date('Y-m-d H:i:s') . "\n";
        
        $headers = "From: ericchaffey@gmail.com\r\n";
        $headers .= "Reply-To: " . $contact_info . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        
        $recipients = $to . "," . $client;
        if (mail($recipients, $subject, $email_body, $headers)) {
            $success = "Thank you for your submission. We will contact you shortly.";
        } else {
            $errors[] = "There was an error sending your message. Please try again.";
        }
    }
    
    // Return JSON response for AJAX requests
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        header('Content-Type: application/json');
        if (isset($success)) {
            echo json_encode(['success' => true, 'message' => $success]);
        } else {
            echo json_encode(['success' => false, 'errors' => $errors]);
        }
        exit;
    }
    
    // For non-AJAX requests, redirect back with status
    if (isset($success)) {
        header('Location: contact-us/?success=1');
    } else {
        header('Location: contact-us/?error=' . urlencode(implode(', ', $errors)));
    }
    exit;
}
?>
