RoadWise: Predictive Traffic Accident Analysis

![fulllogo_nobuffer](https://github.com/user-attachments/assets/4d301ce8-2658-435c-84fa-c34f4e2af6bb)

Overview
RoadWise is a comprehensive project aimed at developing a predictive model for traffic accidents in California using historical data from 2021 to 2023. This project seeks to answer critical questions about traffic accidents, such as:

-Do accidents occur more frequently on weekdays or weekends?
-What are the common causes of traffic accidents?
-How do weather conditions influence the likelihood of traffic accidents?
-Where do the majority of traffic accidents take place: on highways, interstates, or city streets?

Project Structure

1. Analysis Approach
The analysis approach includes the following steps:

Data Collection:

-Data was gathered from Kaggle and the National Highway Transportation Safety Administration (NHTSA).
-Datasets include US accident data from 2016 to 2023.

Data Cleaning:

-Python and Pandas were used for data cleaning.
-Jupyter Notebook and Google Colab were utilized for exploratory analysis.

Data Storage:

-Apache Spark was employed for efficient data storage and handling of large datasets.
Machine Learning:

-The project utilized the Scikit-Learn library to build predictive models.
Data Visualization:

-Visualization tools and libraries include Folium, GeoPandas, Matplotlib, Leaflet, and Plotly.

2. Data Story

-The primary method used in this project is K-means clustering to identify patterns in traffic collisions based on geographical data. 

The following steps were undertaken:

-Model Definition: A K-means model with three clusters was defined and fitted to the scaled data.
-Prediction: The model predicted cluster assignments for each data point, which were then added as a new column labeled "Collisions" in the DataFrame.
Visualization:

-An Elbow Curve was plotted to evaluate the inertia for different numbers of clusters (k) to identify the optimal k.
![elbow_curve](https://github.com/user-attachments/assets/22f78683-ed0a-4b85-9340-7018591d6b09)

-A Geographical Clustering Plot was created to visualize clusters on a map, highlighting distinct geographical segments.

3. Findings
   
Key findings from the analysis include:

-Most accidents happen in clear weather conditions.
-Major North/South and East/West highways see the most accidents.
-Accident numbers spike during AM & PM commute hours.
-Weekdays see more accidents due to higher traffic volumes, especially during commuting hours.
-The most common causes of traffic accidents are distracted driving, speeding, and driving under the influence.
-Adverse weather conditions (rain and snow) significantly increase the likelihood of traffic accidents.


4. Future of RoadWise
   
The future of RoadWise includes:

-Expanding Data Collection: Incorporating data from federal and international sources.
-Creating a 'Safest Route' App: A trip planning tool considering weather conditions and time of day for safer travel.
-Collaboration with Government Agencies: Using our data to develop traffic safety improvement recommendations for high-risk roads.

How to Use
Clone the Repository:

bash
Copy code
git clone https://github.com/YourUsername/RoadWise.git
Install Dependencies:

Ensure you have Python installed.
Install required libraries:
bash
Copy code
pip install -r requirements.txt
Run the Jupyter Notebook:

Navigate to the project directory.
Launch Jupyter Notebook:
bash
Copy code
jupyter notebook
Open and run the analysis notebook to reproduce the results.
Explore the Interactive Map:

Open the index.html file in your browser to view the Los Angeles Traffic Collision Map and interact with the data.

Contributing
We welcome contributions to improve RoadWise! Feel free to open issues or submit pull requests. Please follow the guidelines in CONTRIBUTING.md.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments

-The datasets used in this project were obtained from Kaggle and NHTSA.
-Special thanks to our project team members: Nicole Kyine Lain, Kimberly Bonilla, Mary Mackin, Aye Nyein Mon, and Duygu Ozsoy.
