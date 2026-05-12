-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Host: mhmedia.uosweb.co.uk:3306
-- Generation Time: Jan 03, 2025 at 10:44 AM
-- Server version: 10.6.16-MariaDB
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mohamed_fitness`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE IF NOT EXISTS `activities` (
  `activity_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `activity_name` varchar(255) NOT NULL,
  `activity_image` varchar(255) NOT NULL,
  `activity_instructions` text NOT NULL,
  `activity_time` varchar(255) NOT NULL,
  `activity_people` int(2) NOT NULL,
  `activity_price` varchar(255) NOT NULL,
  `activity_tags` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`activity_id`, `category_id`, `activity_name`, `activity_image`, `activity_instructions`, `activity_time`, `activity_people`, `activity_price`, `activity_tags`) VALUES
(1, 1, 'Long Distance', 'm1.jpg', 'Warm-Up (10-15 minutes)\r\n1. Dynamic Stretches (5 minutes):\r\nLeg Swings: Stand on one leg and swing the other forward and backward, gradually increasing range. Do 10 swings per leg.\r\nLong-Distance Running\r\nStart Slow:\r\n1.Begin at a comfortable pace to conserve energy.\r\n2.Maintain a Steady Pace:\r\nFind a rhythm and focus on breathing deeply (inhale through your nose, exhale through your mouth).\r\nCool-Down (10-15 minutes)\r\nWalk and Gradual Recovery (5-10 minutes):\r\nSlow your pace to a brisk walk for 5 minutes to lower your heart rate gradually.\r\n', '20-30 Min', 1, 'Free', 'run, fit, healthy'),
(3, 3, 'Group Fitness Session', 'm3.jpg', 'Warm-Up (5-10 minutes)\r\nDynamic Movements: Start with light movements to get the heart rate up, such as jogging in place, jumping jacks, or arm circles.\r\nStretching: Perform gentle dynamic stretches to mobilize the joints and activate muscles, including leg swings, hip rotations, and shoulder rolls.\r\nGroup Fitness Session Execution (30-45 minutes)\r\nInstructor-Led Warm-Up:\r\n\r\nThe instructor will guide the group through a full-body warm-up, ensuring that everyone is prepared for the session. This often includes light cardio, mobility exercises, and activation of key muscle groups.\r\nMain Workout:\r\n\r\nIntensity: The intensity of the session will depend on the type of group fitness class (e.g., HIIT, Zumba, Yoga).\r\nExercise Variety: Expect a variety of exercises targeting different muscle groups, whether it’s strength training, cardio, or flexibility work.\r\nForm and Technique: The instructor will guide participants on proper form and technique to ensure safety and maximize results.\r\nMotivation: Group settings provide a motivating atmosphere, with the instructor encouraging participants to push themselves and work at their own pace.\r\nCool-Down:\r\n\r\nAfter completing the main workout, the instructor will lead the group through a cool-down. This includes slowing down the intensity and performing static stretches to help the muscles relax and recover.', '40min', 4, 'Membership', 'run, fit, healthy'),
(4, 4, 'Accuracy and Skill(Target Practice)', 'm4.jpg', '1. Warm-up (Purpose: Prepare your body and mind)\r\nInstruction:\r\nDynamic Stretching - Perform arm circles and leg swings for 2-3 minutes to increase blood flow to the muscles, preparing your body for the movements you''ll be performing.\r\n\r\n2. Practicing Accuracy (Purpose: Improve precision and focus)\r\nInstruction:\r\nControlled Movements - Focus on slow, deliberate actions when aiming at your target. For example, in archery, focus on your form and alignment rather than rushing the shot, aiming to hit a small, specific target.\r\n\r\n3. Practicing Skill (Purpose: Develop technical proficiency)\r\nInstruction:\r\nRepetition of Basic Components - Break the skill down into smaller components. For example, if practicing a basketball shot, start by focusing solely on your hand positioning, then build up to full shooting practice.\r\n\r\n4. Target Practice (Purpose: Refine focus and accuracy under pressure)\r\nInstruction:\r\nIncrease Difficulty Gradually - Start with a larger target or stationary object, and as you become more accurate, shrink the target or increase the challenge (e.g., shoot from a longer distance or at a moving target).\r\n\r\n5. Warm-down (Purpose: Aid in muscle recovery and reduce injury risk)\r\nInstruction:\r\nStatic Stretching - Stretch the major muscle groups for 20-30 seconds each to help reduce muscle tightness and promote flexibility after your practice session.\r\n\r\n', '25Min', 1, 'Membership', 'run, fit, healthy'),
(5, 5, 'Shooting Drills', 'm5.jpg', 'Spot Shooting Drill\r\n\r\nActivity: Shoot from various spots around the court to develop consistency in your shot, with a focus on form and accuracy.\r\nHow to do it:\r\nMark 5 different spots around the court (e.g., mid-range, corner, free throw line, and both wings).\r\nStart at the first spot and take 10 shots. Once you''ve taken all 10, move to the next spot.\r\nFocus on your shooting form (stance, hand placement, follow-through) for every shot.\r\nKeep track of how many shots you make at each spot, and aim to improve your percentage as you progress.\r\nChallenge yourself by adding game-like pressure, such as a timer or by shooting while fatigued.', '20Min', 1, 'Membership', 'Practice,Hoop,Bucket'),
(6, 6, 'Batting Drills', 'm6.jpg', 'Front Foot Defense Drill\r\n\r\nActivity: Practice defending deliveries with your front foot to improve your technique and shot selection.\r\nHow to do it:\r\nStand in your normal batting stance with a cricket ball bowled to you by a partner or a bowling machine.\r\nFocus on moving your front foot towards the ball as it approaches, getting your head and body in line with the delivery.\r\nPractice the forward defense shot by playing the ball softly with a straight bat, ensuring you don’t overbalance.\r\nFocus on watching the ball closely and timing the shot well to avoid hitting the ball too hard.\r\nRepeat for 20-30 balls, adjusting your footwork and timing as needed.', '60Min', 2, 'Membership', 'run, fit, healthy'),
(7, 7, 'Response Time Drills', 'm7.jpg', 'Simulated Start Reaction Drill\r\n\r\nActivity: Practice quick reactions by simulating the start of a race, focusing on accelerating as quickly as possible after a visual or auditory cue.\r\nHow to do it:\r\nPosition yourself in the driving seat (or a simulator, if available).\r\nSet up a trigger (a visual light or sound) to simulate the start of a race. In real F1 races, this could be a set of lights or a sound.\r\nOn the trigger, quickly engage the throttle and shift into gear, aiming to simulate a perfect start by reacting instantly to the cue.\r\nPractice this 10-15 times, focusing on your ability to smoothly and quickly get the car moving.\r\nWork on minimizing the delay between the signal and your acceleration, as reaction time is crucial for gaining an advantage off the line.', '30min', 1, 'Membership', 'run, fit, healthy'),
(8, 8, 'Stickhandling Drills', 'm8.jpg', 'Cone Weaving Drill\r\n\r\nActivity: Practice stickhandling by weaving through cones or obstacles to improve your puck control and agility.\r\nHow to do it:\r\nSet up a series of cones in a straight line or zig-zag pattern, spaced about 1-2 feet apart.\r\nStart at one end of the course and skate towards the cones, using your stick to push the puck from side to side as you weave through them.\r\nFocus on keeping the puck close to your stick, maintaining control while moving at a moderate pace.\r\nAs you progress, increase your speed, or reduce the spacing between the cones to add difficulty.\r\nPerform the drill for 2-3 sets, alternating between forehand and backhand handling to improve both sides of your game.\r\n', '8Mins', 1, 'Membership', 'run, fit, healthy'),
(9, 1, 'Sprinting', 'm9.jpg', 'Warm-Up (10-15 minutes)\r\nJog lightly at a steady pace to loosen up your muscles and elevate your heart rate.\r\nSprinting Execution\r\nStart Strong (First 10 Meters):\r\nPush off powerfully, lean slightly forward, and pump your arms.\r\nMaintain Speed (Middle Sprint):\r\nFocus on quick leg turnover and maintain your form.\r\nFinish Strong (Last 10 Meters):\r\nKeep your speed and form consistent through the finish.\r\n\r\nCool-Down (10-15 minutes)\r\nWalk and Recovery (5 minutes):\r\n\r\nGradually slow down to a brisk walk to lower your heart rate.\r\nStretch (5-10 minutes):\r\n\r\nHamstring Stretch: Sit on the ground, reach for your toes, and hold for 20-30 seconds.', '10-20Mins', 1, 'Membership', 'SPRINT,FAST,GOOOO!'),
(10, 1, 'Treadmill Running', 'm10.jpg', 'Warm-Up (10-15 minutes)\r\nJog Lightly: Start with a light jog at a steady pace to loosen up your muscles and gradually elevate your heart rate. Focus on warming up your legs and preparing for the run.\r\nTreadmill Running Execution\r\nStart Steady:\r\n\r\nSet your treadmill to a comfortable pace, ensuring it''s sustainable for the duration of your run. Start at a pace that allows you to focus on your form and breathing.\r\nIncrease Speed/Intensity:\r\n\r\nGradually increase your speed or incline to challenge your cardiovascular system. If you''re doing interval training, alternate between sprints and recovery jogs based on your workout plan. Aim for a pace that feels challenging but maintainable for your goal (endurance, speed, or intervals).\r\nMaintain Consistency:\r\n\r\nKeep your form upright and engage your core. Avoid holding onto the treadmill rails to ensure you''re working your muscles effectively and maintaining good posture.\r\nCool-Down (10-15 minutes)\r\nWalk and Recovery (5 minutes):\r\n\r\nGradually slow the treadmill to a brisk walk to bring your heart rate down slowly. Focus on deep breathing and relaxing your body.\r\nStretch (5-10 minutes):\r\n\r\nHamstring Stretch: Sit on the ground, extend one leg, and reach for your toes. Hold for 20-30 seconds.\r\nQuadriceps Stretch: Stand and pull one foot toward your glutes. Hold for 20-30 seconds per leg.', '10-20Mins', 1, 'Membership', 'Fitness,Breathe , GO'),
(11, 2, '5 Aside Football', 'm11.jpg', 'Warm-Up (5 minutes)\r\nLight Jog and Stretch (5 minutes)\r\nBegin with a light jog to get your heart rate up.\r\nPerform some light stretches focusing on your legs, such as hamstring stretches, quadriceps stretches, and calf stretches.\r\nKeep it simple and gentle to prepare your muscles for the game ahead.\r\n5-A-Side Football Game Execution (60 minutes)\r\nGame Overview\r\nTeams: Two teams of 5 players each.\r\nIntensity: Since this is a less serious format, focus on having fun, maintaining good ball control, and working together as a team.\r\nMovement: Keep active, move into space, and communicate with teammates. Make short, quick passes and enjoy the fast-paced nature of the game.\r\nGoalkeeping: Goalkeepers should focus on quick reactions and distributing the ball effectively to start counter-attacks.\r\nCool-Down (5 minutes)\r\nLight Jog and Recovery (2-3 minutes)\r\n\r\nSlow down with a light jog or walk to gradually lower your heart rate. Focus on relaxed breathing.\r\nStretching (2-3 minutes)\r\n\r\nHamstring Stretch: Sit down, extend one leg, and reach for your toes. Hold for 20-30 seconds.\r\nQuadriceps Stretch: Stand up, pull one foot toward your glutes, and hold for 20-30 seconds per leg.\r\nCalf Stretch: Stretch each calf by pressing your heel down against the ground and holding for 20-30 seconds.', '60Mins', 10, '60', 'Play,Play,Play'),
(12, 2, '7 Aside Football', 'm12.jpg', 'Warm-Up (5 minutes)\r\nLight Jog and Stretch: Start with a light jog to raise your heart rate, followed by gentle stretches (hamstrings, quads, calves) to prepare your muscles for the game.\r\n7-A-Side Football Game Execution (60 minutes)\r\nGame Overview\r\nTeams: Two teams of 7 players each.\r\nIntensity: Since this is a less serious format, focus on having fun, maintaining good ball control, and working together as a team.\r\nMovement: Keep active, move into space, and communicate with teammates. Make short, quick passes and enjoy the fast-paced nature of the game.\r\nGoalkeeping: Goalkeepers should focus on quick reactions and distributing the ball effectively to start counter-attacks.\r\nCool-Down (5 minutes)\r\nLight Jog and Stretch: Gradually slow down with a light jog or walk, then perform static stretches (hamstrings, quads, calves) to help your muscles relax and recover.', '60Mins', 14, '70', 'Play,Play,Play'),
(13, 3, 'Strength Training', 'm13.jpg', 'Warm-Up (5-10 minutes)\r\nLight Cardio:\r\n\r\nStart with 5-10 minutes of light cardio (e.g., jogging, cycling, or using the elliptical machine) to increase your heart rate and get the blood flowing to your muscles.\r\nDynamic Stretching:\r\n\r\nPerform dynamic stretches such as leg swings, arm circles, and hip rotations to prepare your joints and muscles for the workout ahead.\r\nStrength Training Execution\r\nChoose Your Equipment:\r\n\r\nFree Weights: Dumbbells, barbells, kettlebells.\r\nResistance Machines: Leg press, chest press, lat pulldown, etc.\r\nBodyweight Exercises: Push-ups, squats, lunges, planks.\r\nFocus on Compound Movements:\r\n\r\nSquats: Great for working the legs, hips, and lower back.\r\nDeadlifts: Effective for building strength in the back, legs, and core.\r\nBench Press: Targets the chest, shoulders, and triceps.\r\nPull-ups/Lat Pulldown: Strengthens the back, biceps, and forearms.\r\nOverhead Press: Works the shoulders, arms, and upper chest.\r\nSet Reps and Sets:\r\n\r\nReps: The number of times you perform an exercise in a row (e.g., 10 push-ups).\r\nSets: A group of reps (e.g., 3 sets of 10 reps).\r\nBeginners: 2-3 sets of 8-12 reps.\r\nIntermediate/Advanced: 3-4 sets, adjusting the reps based on goals (strength: 4-6 reps, hypertrophy: 8-12 reps).\r\nProper Form and Technique:\r\n\r\nFocus on performing each exercise with proper form to avoid injury and maximize the effectiveness of the movement. If unsure, ask a trainer for guidance.\r\nExamples: Keep your back straight during squats and deadlifts, and avoid locking your joints during lifting.\r\nRest Between Sets:\r\n\r\nRest for 30 seconds to 2 minutes between sets, depending on your goals (shorter rest for endurance, longer for strength building).\r\nCool-Down (5-10 minutes)\r\nLight Cardio:\r\n\r\nFinish with 5 minutes of light cardio to help lower your heart rate gradually.\r\nStretching:\r\n\r\nPerform static stretches targeting the muscles you worked. Hold each stretch for 20-30 seconds.\r\nFocus on hamstrings, quadriceps, shoulders, and chest to ensure flexibility and reduce muscle tightness.\r\nHydrate and Fuel:\r\n\r\nRehydrate with water and consider consuming a protein-rich snack to aid in muscle recovery.', '50Mins', 1, 'Membership', 'PUSH,PULL,STRENGTH'),
(14, 3, 'Flexibility Training (Stretching and Mobility)', 'm14.jpg', 'Warm-Up (5-10 minutes)\r\nGentle Cardio (Optional):\r\n\r\nA light cardio session (like walking or cycling) can help raise your body temperature before stretching, but it''s not necessary for flexibility training.\r\nDynamic Stretching:\r\n\r\nPerform dynamic stretches such as leg swings, arm circles, or walking lunges to loosen up muscles and prepare your body for deeper stretching.\r\nFlexibility Training Execution\r\nStatic Stretching:\r\n\r\nHamstring Stretch: Sit on the floor with one leg extended and the other bent, then reach for your toes. Hold for 20-30 seconds per leg.\r\nQuadriceps Stretch: Stand and pull one foot towards your glutes, keeping your knees aligned. Hold for 20-30 seconds per leg.\r\nHip Flexor Stretch: Step into a lunge position, pressing the hip of the back leg forward. Hold for 20-30 seconds per leg.\r\nFoam Rolling:\r\n\r\nUse a foam roller to perform self-myofascial release (SMR). Roll over areas like your calves, quads, hamstrings, and back to release muscle tightness and improve blood flow.\r\nSpend about 1-2 minutes per muscle group, focusing on areas of tension.\r\nYoga or Pilates:\r\n\r\nIncorporating yoga or Pilates routines into your flexibility training can improve both your flexibility and core strength. Poses like Downward Dog, Child’s Pose, or Cobra stretch can target various muscle groups.\r\nCool-Down (5-10 minutes)\r\nDeep Breathing and Stretching:\r\n\r\nAfter your flexibility routine, take a few minutes for deep, controlled breathing while holding your stretches. Focus on relaxing and deepening each stretch.\r\nHydration:\r\n\r\nRehydrate after your session, as stretching and foam rolling can sometimes lead to slight muscle release, which needs water for recovery.', '30Mins', 1, 'Membership', 'STRETCH,STRETCH,HEALTH'),
(15, 4, 'Reaction Time Drills', 'm15.jpg', 'Partner Toss Drills\r\n\r\nActivity: Have a partner toss balls at you from different angles to improve your reaction time and ability to intercept balls quickly.\r\nHow to do it:\r\nStand at the center of the baseline or at the net, depending on the level of challenge you want.\r\nHave a partner toss the ball lightly toward different parts of your body (left, right, high, low).\r\nFocus on reacting quickly and getting into position to hit the ball with proper footwork and timing.\r\nGradually increase the speed of the tosses and the variety of ball placements.\r\nYou can also add a small amount of pressure by trying to return the ball back to your partner after each reaction.', '15-20Mins', 1, 'Membership', 'Practice'),
(16, 4, 'Agility Drills ', 'm16.jpg', 'Cone Drills\r\n\r\nActivity: Set up cones in different patterns on the court to improve your agility, speed, and ability to change direction quickly.\r\nHow to do it:\r\nPlace cones in various patterns (e.g., a straight line, zig-zag, or a box shape).\r\nStart at one cone and sprint to the next, focusing on quick direction changes and maintaining balance.\r\nFor added difficulty, practice side shuffles, backward running, and explosive movements.\r\nPerform the drill for 15-30 seconds, then rest briefly, and repeat. Aim for smooth, fast transitions without overextending your steps.\r\n', '15Min', 1, 'Membership', 'Practice'),
(17, 5, 'Passing Drills', 'm17.jpg', 'Partner Passing Drill\r\n\r\nActivity: Practice different types of passes (chest, bounce, overhead) with a partner to improve accuracy and timing.\r\nHow to do it:\r\nStand about 10-15 feet apart from your partner.\r\nStart with chest passes, making sure to follow through toward your partner’s hands.\r\nAfter 10-15 repetitions, switch to bounce passes, aiming for the bounce to occur about halfway between you and your partner.\r\nAdd in overhead passes, focusing on arc and accuracy.\r\nAs you improve, increase the distance between you and your partner and work on making quicker passes with less time to react.', '20Mins', 1, 'Membership', 'PASS,PASS,HOOP'),
(18, 5, 'Dribbling Drills', 'm18.jpg', 'Cone Dribbling Drill\r\n\r\nActivity: Set up cones in a zig-zag pattern and practice dribbling through them to improve control, speed, and direction changes.\r\nHow to do it:\r\nPlace 5-10 cones in a zig-zag pattern, spaced about 3-5 feet apart.\r\nDribble the ball through the cones using both hands, focusing on keeping the ball low and close to the ground.\r\nChange your pace, moving quickly through some cones and slowing down for others to simulate game-like situations.\r\nAfter completing the drill, practice again using only your weaker hand to improve ambidextrous ball control.', '10Min', 1, 'Membership', 'DRIBBLE DRIBBLE ANKLEBREAKER'),
(19, 6, 'Bowling Drills ', 'm19.jpg', 'Target Bowling Drill\r\n\r\nActivity: Bowl at a specific target on the pitch to improve your accuracy and consistency.\r\nHow to do it:\r\nSet up a target (such as a small cone or a set of stumps) in an area where you want the ball to land (e.g., on the good length or on the stumps).\r\nFocus on hitting that target consistently, whether you''re bowling fast or spinning the ball.\r\nStart by bowling with a slower pace to concentrate on technique and accuracy, then gradually increase speed while maintaining control.\r\nPerform the drill for 10-15 deliveries, adjusting your line and length based on the target.\r\nAfter completing a set, review your results and try to improve your consistency in hitting the target area.\r\n', '20Min', 1, 'Membership', 'BOWL BOWL GO!'),
(20, 6, 'Fielding Drills ', 'm20.jpg', 'Catching and Reflex Drill\r\n\r\nActivity: Practice catching and reacting quickly to balls thrown at different heights and angles to improve reflexes and agility in the field.\r\nHow to do it:\r\nHave a partner stand at a short distance and throw balls at you from various angles and heights (low, chest-high, and above head level).\r\nFocus on tracking the ball with your eyes and getting into the proper catching position for each throw (e.g., hands cupped for low balls, fingers pointing up for high balls).\r\nReact quickly to each throw, ensuring that you keep your eyes on the ball and your hands ready to catch.\r\nPerform the drill for 10-20 throws, concentrating on making clean catches.\r\nGradually increase the difficulty by having your partner throw the ball harder or at varying speeds to simulate real-match situations.\r\n', '20Min', 1, 'Membership', 'PLAY PLAY PLAY'),
(21, 7, 'Cornering Techniques ', 'm21.jpg', 'Simulated Start Reaction Drill\r\n\r\nActivity: Practice quick reactions by simulating the start of a race, focusing on accelerating as quickly as possible after a visual or auditory cue.\r\nHow to do it:\r\nPosition yourself in the driving seat (or a simulator, if available).\r\nSet up a trigger (a visual light or sound) to simulate the start of a race. In real F1 races, this could be a set of lights or a sound.\r\nOn the trigger, quickly engage the throttle and shift into gear, aiming to simulate a perfect start by reacting instantly to the cue.\r\nPractice this 10-15 times, focusing on your ability to smoothly and quickly get the car moving.\r\nWork on minimizing the delay between the signal and your acceleration, as reaction time is crucial for gaining an advantage off the line.', '20Min', 1, 'Membership', 'GO GO GO'),
(23, 8, 'Shooting Drills', 'm23.jpg', 'Target Shooting Drill\r\n\r\nActivity: Practice shooting on goal with an emphasis on accuracy, aiming for specific targets within the net.\r\nHow to do it:\r\nSet up targets (e.g., small cones or colored markers) in the four corners of the goal, or use the goalposts and crossbar as targets.\r\nStand at a reasonable distance from the net, then practice shooting the puck at the designated target areas.\r\nFocus on your shooting form, including your body alignment, follow-through, and quick release.\r\nStart by shooting from one spot, then vary your position around the crease to simulate game situations.\r\nGradually increase the power of your shots while maintaining accuracy and consistency. Perform 10-15 shots from different positions on the ice.', '20Min', 1, 'Membership', 'SHOOT SHOOT SHOOT'),
(24, 8, 'Passing Drills', 'm24.jpg', 'Partner Passing Drill\r\n\r\nActivity: Practice passing the puck with a partner to improve accuracy, timing, and decision-making under pressure.\r\nHow to do it:\r\nStand about 10-15 feet apart from your partner, with both of you holding your sticks in a ready position.\r\nPass the puck back and forth with your partner, focusing on accuracy and making quick, crisp passes.\r\nStart by passing on the forehand, then switch to backhand passes to improve both sides of your game.\r\nGradually increase the speed of your passing, incorporating movement to simulate game-like situations. Skate before passing, or pass while on the move.\r\nOnce comfortable with the basics, practice quick one-touch passes or add some defensive pressure to simulate game conditions.', '15Min', 1, 'Membership', 'PASS PASS PASS'),
(25, 7, 'Endurance Training ', 'm25.jpg', 'Fitness & Mental Focus Training\r\n\r\nActivity: Engage in physical training to enhance your stamina and mental endurance, mimicking the demands of long, high-stress races.\r\nHow to do it:\r\nBegin with high-intensity interval training (HIIT) sessions to improve cardiovascular endurance, simulating the physical stress experienced during a race.\r\nCombine the training with mental exercises like visualization or focus drills, where you mentally rehearse race scenarios or practice staying calm under pressure.\r\nAdd core exercises to improve strength and posture control for handling the car during high-speed maneuvers.\r\nWork in a simulator or real car to practice maintaining consistent lap times under fatigue, simulating the exhaustion felt in the later stages of a race.\r\nIncrease your session lengths gradually to build stamina and mental resilience, ensuring you''re prepared for long, intense race conditions.', '12Min', 1, 'Membership', 'GO GO GO'),
(26, 2, '11 Aside Football', 'm26.jpg\r\n', 'Warm-Up (10-15 minutes)\r\nJog (5 minutes)\r\n\r\nBegin with a light jog to elevate your heart rate and loosen up your muscles. This helps prepare your body for the game.\r\nFootball-Specific Drills (5 minutes)\r\n\r\nPassing Drills: Pair up with a teammate and pass the ball back and forth. Focus on accuracy and controlling the ball with different parts of your foot (inside, outside, and instep).\r\n11-A-Side Football Game Execution\r\nKick-Off and Start Strong\r\n\r\nStart the match with intensity. Focus on team communication, positioning, and maintaining possession. Get a feel for the ball and quickly settle into your role.\r\nMaintain Team Structure\r\n\r\nDefenders: Stay tight on your mark, clear the ball when necessary, and stay aware of the opposition’s forwards.\r\nMidfielders: Control the tempo of the game, distribute the ball effectively, and be available for both defensive and attacking duties.\r\nForwards: Make runs behind the defense, stay alert for chances, and be ready to capitalize on goal-scoring opportunities.\r\nWork as a Unit\r\n\r\nPressing: Press the opposition when they have the ball, working together to regain possession.\r\nPossession Play: Keep the ball moving with accurate passes. Switch the play to stretch the opposition’s defense and create space.\r\nCool-Down (5-10 minutes)\r\nBreathing Techniques\r\n\r\nFocus on deep, slow breaths to help lower your heart rate and aid in recovery. Inhale deeply through your nose and exhale through your mouth.\r\nFuel Up\r\n\r\nRehydrate and consume a post-game snack or drink that includes carbohydrates and protein to help muscle recovery.\r\nWarm-Down Stretches\r\n\r\nHamstring Stretch: Sit on the ground and extend one leg while reaching for your toes. Hold for 20-30 seconds on each leg.\r\nQuadriceps Stretch: Stand, bend one knee, and pull your foot toward your glutes. Hold for 20-30 seconds per leg.\r\nCalf Stretch: Place your hands on a wall and extend one leg behind you, pressing your heel into the ground. Hold for 20-30 seconds per leg.', '90Mins', 22, '90', 'Play,Enjoy, Good Game');

-- --------------------------------------------------------

--
-- Table structure for table `activity_categories`
--

CREATE TABLE IF NOT EXISTS `activity_categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `category_image` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_categories`
--

INSERT INTO `activity_categories` (`category_id`, `category_name`, `category_image`) VALUES
(1, 'Running Activity', 'recipe-1.jpg'),
(2, 'Football Activity', 'recipe-2.jpg'),
(3, 'Gym Activity', 'recipe-3.jpg'),
(4, 'Tennis Activity', 'recipe-4.jpg'),
(5, 'Basketball Activity', 'recipe-5.jpg'),
(6, 'Cricket Activity', 'recipe-6.jpg'),
(7, 'F1 Activity', 'recipe-7.jpg'),
(8, 'Hockey Activity', 'recipe-8.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `activity_images`
--

CREATE TABLE IF NOT EXISTS `activity_images` (
  `activity_image_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `activity_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_images`
--

INSERT INTO `activity_images` (`activity_image_id`, `activity_id`, `activity_image`) VALUES
(1, 1, 'm1.jpg'),
(3, 3, 'm3.jpg'),
(4, 4, 'm4.jpg'),
(5, 5, 'm5.jpg'),
(6, 6, 'm6.jpg'),
(7, 7, 'm7.jpg'),
(8, 8, 'm8.jpg'),
(9, 9, 'm9.jpg'),
(10, 10, 'm10.jpg'),
(11, 11, 'm11.jpg'),
(12, 12, 'm12.jpg'),
(13, 13, 'm13.jpg'),
(14, 14, 'm14.jpg'),
(15, 15, 'm15.jpg'),
(16, 16, 'm16.jpg'),
(17, 17, 'm17.jpg'),
(18, 18, 'm18.jpg'),
(19, 19, 'm19.jpg'),
(20, 20, 'm20.jpg'),
(21, 21, 'm21.jpg'),
(23, 23, 'm23.jpg'),
(24, 24, 'm24.jpg'),
(25, 25, 'm25.jpg'),
(26, 26, 'm26.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE IF NOT EXISTS `reviews` (
  `review_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `review_rating` int(1) NOT NULL,
  `review` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`review_id`, `user_id`, `activity_id`, `review_rating`, `review`) VALUES
(1, 1, 1, 4, 'sample review one'),
(2, 2, 1, 2, 'sample review two'),
(3, 1, 1, 1, 'sample review three'),
(5, 4, 3, 1, 'sample review four'),
(6, 3, 3, 1, 'sample review five'),
(7, 1, 1, 1, 'sample review six'),
(8, 2, 12, 5, 'sample review seven'),
(9, 1, 12, 3, 'sample review eight'),
(10, 4, 12, 5, 'Sample review nine updated!'),
(15, 120, 11, 4, 'WHAT A SESSION , LETS GO AGAIN NEXT WEEK'),
(16, 120, 17, 5, 'This Passing exercise was perfect for me and think with more practice i can improve following this guidance '),
(17, 120, 1, 5, 'WOW'),
(18, 121, 9, 5, 'WOW'),
(19, 121, 1, 5, 'THIS 5KM was worth it have to do it again');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_pass` varchar(255) NOT NULL,
  `first_name` varchar(225) NOT NULL,
  `last_name` varchar(225) NOT NULL,
  `user_image` text DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_email`, `user_pass`, `first_name`, `last_name`, `user_image`) VALUES
(2, 'RobertABradshaw@gmail.com', '$2y$10$bpC4x3R15C/x88DOUt6sD.vVPj9I8.r5NZ5uoy4bWyoXft6TELb9i', 'Robert ', 'Bradshaw', 'default_user.png'),
(3, 'NedABennettl92@gmail.com', '$2y$10$1Ixz2pmM6sAgkoPVkELOi.r4LKTE01DXmf.G8qKMDmP6qVB80KC2a', 'Ned ', 'Bennett', 'default_user.png'),
(120, 'ibbyC10@icloud.com', '$2y$10$3jLpd0RjUSrCRMsNKk9pju7hIlFevV.ncROBdDbynfxy/r19oMbb6', 'Ibby', 'Charles', 'default_user.png'),
(121, 'SyedI@test.com', '$2y$10$hhGUTqec9qfZlIZ0TPyQYOYD3MGaPFWOV2XTJ6LEKlfCgvZr6o4/i', 'Syed', 'Islam', 'default_user.png');

-- --------------------------------------------------------

--
-- Table structure for table `user_favourites`
--

CREATE TABLE IF NOT EXISTS `user_favourites` (
  `user_fav_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_favourites`
--

INSERT INTO `user_favourites` (`user_fav_id`, `user_id`, `activity_id`) VALUES
(9, 7, 7),
(11, 7, 2),
(12, 9, 12),
(13, 7, 12),
(14, 7, 5),
(17, 11, 26),
(18, 4, 11),
(19, 121, 10),
(20, 121, 20),
(21, 121, 16);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`activity_id`);

--
-- Indexes for table `activity_categories`
--
ALTER TABLE `activity_categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `activity_images`
--
ALTER TABLE `activity_images`
  ADD PRIMARY KEY (`activity_image_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_favourites`
--
ALTER TABLE `user_favourites`
  ADD PRIMARY KEY (`user_fav_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `activity_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `activity_categories`
--
ALTER TABLE `activity_categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `activity_images`
--
ALTER TABLE `activity_images`
  MODIFY `activity_image_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=122;
--
-- AUTO_INCREMENT for table `user_favourites`
--
ALTER TABLE `user_favourites`
  MODIFY `user_fav_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=22;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
