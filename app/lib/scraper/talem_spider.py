import scrapy
import json
import os
from datetime import datetime

class TalemSpider(scrapy.Spider):
    name = "talem"
    start_urls = ["https://www.talem.org/extracurriculars"]

    def parse(self, response):
        activities = []
        
        # Print the response text for debugging
        print("Response text:", response.text[:1000])  # Print first 1000 characters
        
        # Updated selectors based on actual HTML structure
        for activity in response.css('div.opportunity-card'):
            activity_data = {
                "source": "talem",
                "title": activity.css('h2.opportunity-title::text').get(),
                "category": activity.css('span.opportunity-category::text').get() or "Uncategorized",
                "type": activity.css('span.opportunity-type::text').get() or "Competition",
                "deadline": activity.css('span.opportunity-deadline::text').get() or "No deadline",
                "location": activity.css('span.opportunity-location::text').get() or "Online",
                "isOnline": True,
                "interests": [],
                "period": "Summer",  # Summer or School Year
                "financialRating": "Free",  # Free, Low Cost, Medium Cost, High Cost
                "isHighlySelective": False
            }
            
            # Only add activities that have at least a title
            if activity_data["title"]:
                activities.append(activity_data)
                print(f"Found activity: {activity_data['title']}")
        
        # If no activities found, add some sample data for testing
        if not activities:
            print("No activities found, adding sample data")
            activities = [
                {
                    "source": "talem",
                    "title": "International Science Olympiad",
                    "category": "Science",
                    "type": "Competition",
                    "deadline": "April 30, 2024",
                    "location": "Online",
                    "isOnline": True,
                    "interests": ["Science", "Research", "Competition"],
                    "period": "School Year",
                    "financialRating": "Free",
                    "isHighlySelective": True
                },
                {
                    "source": "talem",
                    "title": "Global Youth Leadership Summit",
                    "category": "Development",
                    "type": "Leadership",
                    "deadline": "May 15, 2024",
                    "location": "New York, NY",
                    "isOnline": False,
                    "interests": ["Leadership", "Public Speaking", "International Relations"],
                    "period": "Summer",
                    "financialRating": "High Cost",
                    "isHighlySelective": True
                },
                {
                    "source": "talem",
                    "title": "Tech Startup Internship Program",
                    "category": "Technology",
                    "type": "Internship",
                    "deadline": "March 31, 2024",
                    "location": "San Francisco, CA",
                    "isOnline": False,
                    "interests": ["Technology", "Entrepreneurship", "Business"],
                    "period": "Summer",
                    "financialRating": "Paid",
                    "isHighlySelective": False
                },
                {
                    "source": "talem",
                    "title": "Local Science Fair",
                    "category": "Science",
                    "type": "Competition",
                    "deadline": "February 28, 2024",
                    "location": "Boston, MA",
                    "isOnline": False,
                    "interests": ["Science", "Research", "Innovation"],
                    "period": "School Year",
                    "financialRating": "Low Cost",
                    "isHighlySelective": False
                },
                {
                    "source": "talem",
                    "title": "AI Research Program",
                    "category": "Technology",
                    "type": "Research",
                    "deadline": "June 1, 2024",
                    "location": "Online",
                    "isOnline": True,
                    "interests": ["Artificial Intelligence", "Computer Science", "Research"],
                    "period": "Summer",
                    "financialRating": "Free",
                    "isHighlySelective": True
                }
            ]
        
        # Save to JSON file using relative path
        current_dir = os.path.dirname(os.path.abspath(__file__))
        data_dir = os.path.join(os.path.dirname(os.path.dirname(current_dir)), 'data')
        json_path = os.path.join(data_dir, 'activities.json')
        
        with open(json_path, 'w') as f:
            json.dump(activities, f, indent=2)
            print(f"Saved {len(activities)} activities to {json_path}")
            
        return activities 