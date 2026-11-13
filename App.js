import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  Button,
  Alert,
  TextInput,
} from 'react-native';

const COLORS = {
  background: '#EFF2F6',
  card: '#FFFFFF',
  primary: '#2563EB',
  primaryLight: '#E8F0FE',
  text: '#1E293B',
  muted: '#64748B',
  border: '#E2E8F0',
  online: '#22C55E',
  offline: '#94A3B8',
};

const BASE_FOLLOWERS = 1200;
const MAX_MESSAGE = 140;

const SKILLS = ['React Native', 'JavaScript', 'UI Design', 'Git', 'Flexbox'];

const BIO =
  'Building cross-platform apps with React Native. I love clean layouts, accessible design and sharing what I learn with the community. When I am not coding, I mentor junior developers, contribute to open source and explore new coffee shops around the city.';

export default function App() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Derived values
  const followers = BASE_FOLLOWERS + (isFollowing ? 1 : 0);
  const isSendDisabled = message.trim().length === 0;

  // Handlers
  const handleFollowPress = () => {
    setIsFollowing(!isFollowing);
  };

  const handleMessagePress = () => {
    setIsComposerOpen(!isComposerOpen);
  };

  const handleSharePress = () => {
    Alert.alert('Share Profile', "Sharing Alex Rivera's profile link!");
  };

  const handleSendPress = () => {
    Alert.alert('Message sent', message);
    setMessage('');
    setIsComposerOpen(false);
  };

  const handleSkillPress = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((item) => item !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        {/* Banner */}
        <Image
          source={require('./assets/banner.png')}
          style={styles.banner}
          resizeMode="cover"
        />

        <View style={styles.content}>
          {/* Header: Avatar + Name */}
          <View style={styles.headerRow}>
            <Pressable
              onPress={() => setIsOnline(!isOnline)}
              style={styles.avatarWrapper}
            >
              <Image
                source={require('./assets/avatar.png')}
                style={styles.avatar}
              />
              <View
                style={[
                  styles.onlineBadge,
                  !isOnline && styles.offlineBadge,
                ]}
              />
            </Pressable>

            <View style={styles.nameContainer}>
              <Text style={styles.name}>Alex Rivera</Text>
              <Text style={styles.role}>Mobile Developer</Text>
              <Text style={styles.location}>Lisbon, Portugal</Text>
            </View>
          </View>

          {/* Bio */}
          <View style={styles.bioSection}>
            <Text
              style={styles.bio}
              numberOfLines={isBioExpanded ? undefined : 3}
            >
              {BIO}
            </Text>
            <Pressable onPress={() => setIsBioExpanded(!isBioExpanded)}>
              <Text style={styles.link}>
                {isBioExpanded ? 'Show less' : 'Read more'}
              </Text>
            </Pressable>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Projects</Text>
            </View>
            <View style={[styles.statBox, styles.statBorder]}>
              <Text style={styles.statValue}>
                {followers.toLocaleString('en-US')}
              </Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>180</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          {/* Skills */}
          <View style={styles.skillsContainer}>
            {SKILLS.map((skill) => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <Pressable
                  key={skill}
                  onPress={() => handleSkillPress(skill)}
                  style={({ pressed }) => [
                    styles.tag,
                    isSelected && styles.tagSelected,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.tagText,
                      isSelected && styles.tagTextSelected,
                    ]}
                  >
                    {skill}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Text style={styles.hint}>
            Tap a skill to select it · {selectedSkills.length} selected
          </Text>

          {/* Action Buttons */}
          <View style={styles.actionsRow}>
            <Pressable
              onPress={handleFollowPress}
              style={({ pressed }) => [
                styles.button,
                styles.buttonPrimary,
                isFollowing && styles.buttonFollowing,
                pressed && styles.pressed,
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  isFollowing && styles.buttonTextFollowing,
                ]}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </Pressable>

            <Pressable
              onPress={handleMessagePress}
              style={({ pressed }) => [
                styles.button,
                styles.buttonOutline,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.buttonOutlineText}>
                {isComposerOpen ? 'Close' : 'Message'}
              </Text>
            </Pressable>
          </View>

          {/* Conditional Message Composer */}
          {isComposerOpen && (
            <View style={styles.composer}>
              <TextInput
                style={styles.input}
                value={message}
                onChangeText={(newText) => setMessage(newText)}
                maxLength={MAX_MESSAGE}
                placeholder="Write a message..."
                placeholderTextColor={COLORS.muted}
              />
              <View style={styles.composerFooter}>
                <Text style={styles.counter}>
                  {message.length}/{MAX_MESSAGE} characters
                </Text>
                <Pressable
                  onPress={handleSendPress}
                  disabled={isSendDisabled}
                  style={({ pressed }) => [
                    styles.sendButton,
                    isSendDisabled && styles.sendButtonDisabled,
                    pressed && !isSendDisabled && styles.pressed,
                  ]}
                >
                  <Text style={styles.sendText}>Send</Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* Share Button */}
          <View style={styles.shareWrapper}>
            <Button
              title="Share profile"
              color={COLORS.primary}
              onPress={handleSharePress}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  banner: {
    width: '100%',
    height: 130,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: -45,
    marginBottom: 16,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: COLORS.card,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.online,
    borderWidth: 3,
    borderColor: COLORS.card,
  },
  nameContainer: {
    marginLeft: 14,
    paddingBottom: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
  },
  role: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: 2,
  },
  location: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 2,
  },
  bioSection: {
    marginBottom: 16,
  },
  bio: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.text,
  },
  statsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 14,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  button: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  buttonTextFollowing: {
    color: COLORS.primary,
  },
  buttonOutline: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: 'transparent',
  },
  buttonOutlineText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
  buttonFollowing: {
    backgroundColor: COLORS.primaryLight,
  },
  composer: {
    marginTop: 16,
  },
  composerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  counter: {
    fontSize: 12,
    color: COLORS.muted,
  },
  hint: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.muted,
  },
  input: {
    height: 44,
    paddingHorizontal: 12,
    fontSize: 15,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
  },
  link: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  offlineBadge: {
    backgroundColor: COLORS.offline,
  },
  pressed: {
    opacity: 0.6,
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.offline,
  },
  sendText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  shareWrapper: {
    marginTop: 12,
    alignItems: 'center',
  },
  tagSelected: {
    backgroundColor: COLORS.primary,
  },
  tagTextSelected: {
    color: '#FFFFFF',
  },
});