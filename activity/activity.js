document.addEventListener("DOMContentLoaded", () => {
    const activityContainer = document.getElementById("activityContainer");
    const recreationalBtn = document.getElementById("recreationalBtn");
    const participantsBtn = document.getElementById("participantsBtn");

    recreationalBtn.addEventListener("click", () => {
        getActivity("recreational");
    });

    participantsBtn.addEventListener("click", () => {
        getActivity("participants=1");
    });

    function getActivity(type) {
        activityContainer.innerHTML = "Please wait...";

        fetch(`https://www.boredapi.com/api/activity?${type}`)
            .then(response => response.json())
            .then(data => {
                if (data.activity) {
                    activityContainer.innerHTML = `${data.activity}`;
                } else {
                    throw new Error("Failed to fetch activity.");
                }
            })
            .catch(error => {
                console.error("Error fetching activity:", error);
                activityContainer.innerHTML = "<p>Failed to fetch activity. Please try again later.</p>";
            });
    }
});
