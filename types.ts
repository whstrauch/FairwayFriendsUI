import { usePreventRemoveContext } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type LoginNavigation = {
    Login: undefined;
    SignUp: undefined;
    ResetPassword: undefined;
    MainApp: undefined;
    UserInfo: {
        username: string;
    };
};

export type MainTabNavigation = {
    HomeStack: undefined;
    FindStack: undefined;
    PlayStack: undefined;
    ClubStack: undefined;
    AccountStack: undefined;
}

export type HomeStackNavigation = {
    Home: undefined;
    Comments: {
        inputFocused: Boolean;
        comments: Array<any>;
        postId: number;
    };
    Likes: {
        likes: Array<any>;
    };
    PlayingGroup: {
        tags: Array<any>;
    };
    Notification2: undefined
    Profile: {
        user_id: string | number;
        main_user: boolean;
    }

}

export type FindStackNavigation = {
    Find: undefined;
    Profile: {
        user_id: string | number;
        main_user: boolean;
    };
    FollowingList: {
        type: string
        user_id: string | number
    };
}

export type AccountStackNavigation = {
    Profile: {
        user_id: string | number;
        main_user: boolean;
    };
    FollowingList: {
        type: string
        user_id: string | number
    };
    Comments: {
        inputFocused: Boolean;
        comments: Array<any>;
        postId: number;
    };
    Likes: {
        likes: Array<any>;
    }
    PlayingGroup: {
        tags: Array<any>;
    };
    Notifications: undefined
    EditProfile: {
        name: string;
        username: string;
        bio: string;
        prof_pic: any;
        id: string | number;
        public: boolean;
    }
    Settings: undefined

}

export type PlayStackNavigation = {
    Play: undefined;
    FindCourse: undefined;
    PostRound: {
        courseId: string | number;
        courseName: string;
    };
    Scorekeeping: {
        courseId: string | number;
        courseName: string;
        numHoles: string | number;
        tees: string | null;
        scoreType: string;
        startingHole: number
    }
    SetUpRound: {
        course: {
            course_id: string | number;
            course_name: string;
            num_holes: string | number;
            tees: string | null;
            scoreType: string;
            startingHole: number
        }
    }

}

export type CommentType = {
        id: string;
        name: string;
        comment: string;
        timestamp: string
}

export type LikeType = {
        id: string;
        user_id: string;
        name: string;
        timestamp: string
        is_following: Boolean

}

export type UserType = {
    user: {
        user_id: string;
        name: string;
        username: string;
        status?: string;
        is_following?: string;
        profile_pic: string;
    }, 
    relationship?: {
        followee_id: string;
        follower_id: string;
        id: string;
        last_update: string;
        status: string;
    },
    type: string
    timestamp?: string
}

export type UserContextType = {
    jwt: string;
    id: string
}