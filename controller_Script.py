#!/usr/bin/env python3

import rospy
from geometry_msgs.msg import Twist
from custom_msg.msg import custom
from nav_msgs.msg import Odometry
import math
from std_msgs.msg import String

#Kp_linear = 0.5  # Proportional gain for linear velocity control (Proportional gain is how the controller responds to the error)
#Kp_angular = 0.5 # Proportional gain for angular velocity control

LINEAR_VELOCITY = 0.2  # Assumed any value
ANGULAR_VELOCITY = 0.2

def callback(inp):
    command = inp.data

    twist = Twist()

    if command == 'w':
        twist.linear.x = LINEAR_VELOCITY
    elif command == 's':
        twist.linear.x = -LINEAR_VELOCITY
    elif command == 'a':
        twist.angular.z = ANGULAR_VELOCITY
    elif command == 'd':
        twist.angular.z = -ANGULAR_VELOCITY

    pub.publish(twist)
    rospy.sleep(5)
    twist.linear.x = 0.0 
    twist.angular.z = 0.0 

    pub.publish(twist)
    
  #  target_distance = 0.0
   # target_angle = 0.0

    #if command == 'w':
        #target_distance = 1.0  
    #elif command == 's':
       # target_distance = -1.0
    #elif command == 'a':
      #  target_angle = 1.57
    #elif command == 'd':
       #target_angle = -1.57
    
    # Initialize the control variables
    #start_time = rospy.Time.now().to_sec()
    #current_distance = 0.0
    #current_angle = 0.0
    #error = target_distance - current_distance
    #error1 = target_angle - current_angle

    
    #while abs(error) > 0.05 or abs(error1) > 0.03:  

    #    rospy.sleep(0.1)
        # Calculate the control effort using P-controller
        #control_effort = Kp_linear * error
        #control_effort1 = Kp_angular * error1
        
        # Set the linear velocity
        #twist.linear.x = control_effort
    #twist.angular.z = control_effort1
        #pub.publish(twist)
        
        # Calculate elapsed time and update current distance
        #elapsed_time = rospy.Time.now().to_sec() - start_time
        #current_distance = control_effort * elapsed_time
        #current_angle = control_effort1 * elapsed_time
        
        # Updation
        #error = target_distance - current_distance
        #error = target_angle - current_angle

        #print(current_distance)
        #print(error)
    
    # Stop the TurtleBot
    #twist.linear.x = 0.0
    #twist.angular.z = 0.0
    pub.publish(twist)

if __name__ == '__main__':
    rospy.init_node('controller')
    rospy.Subscriber('user_input', String, callback)
    pub = rospy.Publisher('/cmd_vel', Twist, queue_size=10)

    rospy.spin()
