$(document).ready(function() {
    $('#generateBtn').click(function() {
        var length = $('#lengthInput').val();
        var name = $('#nameInput').val().trim(); // Get the custom name and remove leading/trailing spaces

        if (length < 1) {
            alert('Please enter a valid length.');
            return;
        }

        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/passwordgenerator?length=' + length,
            headers: { 'X-Api-Key': 'AVX5LBx7f/8psp3DtYtqQw==2IpcRSLGpqAwFwrY' },
            contentType: 'application/json',
            success: function(result) {
                var generatedPassword = result.random_password;
                if (name) {
                    generatedPassword = name + '-' + generatedPassword; // Append custom name to the generated password
                }
                $('#passwordDisplay').html('<strong>Generated Password:</strong> ' + generatedPassword);
                $('#copyBtn').show(); // Show the copy button after generating the password

                // Add event listener to the copy button
                $('#copyBtn').off('click').on('click', copyPassword);
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        });
    });

    // Function to copy the generated password to clipboard
    function copyPassword() {
        const passwordToCopy = $('#passwordDisplay').text().trim().replace('Generated Password:', '').trim();
        navigator.clipboard.writeText(passwordToCopy)
            .then(() => {
                $('#copyBtn').text('Copied!');
                setTimeout(() => {
                    $('#copyBtn').text('Copy');
                }, 3000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }
});
