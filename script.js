function formatToIndianRupees(number) {
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    });

    return formatter.format(number);
}

$(document).ready(function () {
    $('#taxForm').submit(function (event) {
        event.preventDefault();

        // Reset any previous error indicators
        $('.form-control').removeClass('is-invalid');

        // Get input values
        let grossIncome = parseFloat($('#grossIncome').val());
        let extraIncome = parseFloat($('#extraIncome').val()) || 0;
        let deductions = parseFloat($('#deductions').val()) || 0;
        let age = $('#age').val();
        age = Number(age)
        // Validate age selection
        if (!age) {
            $('#age').addClass('is-invalid');
            return;
        }

        // Calculate taxable income
        let totalIncome = grossIncome + extraIncome - deductions;
        let taxableIncome = totalIncome - 800000;
        if (taxableIncome <= 0) {
            $('#resultBody').html('<p>No tax applicable.</p>');
            $('#resultModal').modal('show');
            return;
        }

        // Calculate tax based on age
        let taxRate;
        if (age <40) {
            taxRate = 0.3;
        } else if (age>=40 && age <60 ) {
            taxRate = 0.4;
        } else if (age>=60) {
            taxRate = 0.1;
        }
  
        let taxAmount = taxRate * taxableIncome;
        let overallIncomeAfterDeduction = totalIncome-taxAmount;
        // Display result in modal
        $('#resultBody').html('<h2>Your overall income will be</h2><h5>'+formatToIndianRupees(overallIncomeAfterDeduction)+'</h5><br><p>Taxable Income: ' + formatToIndianRupees(taxableIncome) +
            '<p>Tax Amount: ' + formatToIndianRupees(taxAmount)  );
        $('#resultModal').modal('show');
        $('#copyResult').click(function () {
            let resultText = $('#resultBody').text();
            navigator.clipboard.writeText(resultText)
                .then(() => {
                    alert('Result copied to clipboard!');
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        });
    });
});
